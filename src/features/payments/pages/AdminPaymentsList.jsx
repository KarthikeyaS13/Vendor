import React, { useState, useEffect } from 'react';
import { Search, Filter, Eye, Banknote } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ProcessPaymentModal from '../components/ProcessPaymentModal';

export default function AdminPaymentsList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const fetchPaymentsQueue = async () => {
    try {
      const res = await fetch('/api/invoices', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      
      // Filter for invoices ready for payment or already paid
      const paymentInvoices = data.filter(inv => ['Approved', 'Ready for Payment', 'Payment Processing', 'Paid'].includes(inv.status));
      setInvoices(paymentInvoices);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payments queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsQueue();
  }, []);

  const filteredInvoices = invoices.filter(inv => 
    inv.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.po_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Payments</h1>
          <p className="text-slate-500">Manage and process approved invoice payments.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative max-w-md w-full">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by invoice, vendor, or PO..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Vendor</th>
                <th className="px-6 py-4">PO Number</th>
                <th className="px-6 py-4 text-right">Amount (₹)</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    <span className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin inline-block mb-2"></span>
                    <p>Loading payments...</p>
                  </td>
                </tr>
              ) : filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-slate-500">
                    No invoices found in payment queue.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{inv.invoice_number}</td>
                    <td className="px-6 py-4 text-slate-600">{inv.vendor_name}</td>
                    <td className="px-6 py-4 text-blue-600 font-medium">{inv.po_number}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                      {inv.grand_total ? inv.grand_total.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {inv.due_date ? new Date(inv.due_date).toLocaleDateString() : 'Pending'}
                    </td>
                    <td className="px-6 py-4">
                      {inv.status === 'Paid' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Ready
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => setSelectedInvoiceId(inv.id)}
                        className="inline-flex items-center justify-center p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                        title="Process Payment"
                      >
                        {inv.status === 'Paid' ? <Eye className="w-4 h-4" /> : <Banknote className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedInvoiceId && (
        <ProcessPaymentModal 
          invoiceId={selectedInvoiceId} 
          onClose={(shouldRefresh) => {
            setSelectedInvoiceId(null);
            if (shouldRefresh) fetchPaymentsQueue();
          }} 
        />
      )}
    </div>
  );
}
