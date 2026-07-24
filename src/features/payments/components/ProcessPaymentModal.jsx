import React, { useState, useEffect } from 'react';
import { X, Banknote, CheckCircle2, Receipt, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProcessPaymentModal({ invoiceId, onClose }) {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [paymentData, setPaymentData] = useState({
    payment_date: new Date().toISOString().split('T')[0],
    payment_reference: '',
    payment_mode: 'NEFT',
    bank_name: '',
    remarks: ''
  });

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const res = await fetch(`/api/invoices/${invoiceId}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        setInvoice(data);
      } catch (error) {
        console.error('Error fetching invoice details:', error);
      } finally {
        setLoading(false);
      }
    };
    if (invoiceId) fetchInvoice();
  }, [invoiceId]);

  const handlePaymentSubmit = async () => {
    if (!paymentData.payment_reference.trim() || !paymentData.bank_name.trim()) {
      toast.error('Payment Reference and Bank Name are required');
      return;
    }

    setIsProcessing(true);
    try {
      const res = await fetch(`/api/invoices/${invoiceId}/pay`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(paymentData)
      });
      
      if (res.ok) {
        toast.success('Payment recorded successfully');
        onClose(true);
      } else {
        const data = await res.json();
        toast.error(data.error || 'Failed to record payment');
      }
    } catch (error) {
      console.error('Error recording payment:', error);
      toast.error('An error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl flex items-center gap-3">
          <span className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
          <span className="text-slate-600 font-medium">Loading details...</span>
        </div>
      </div>
    );
  }

  if (!invoice) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50 rounded-t-xl shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
              {invoice.status === 'Paid' ? <CheckCircle2 className="w-5 h-5" /> : <Banknote className="w-5 h-5" />}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {invoice.status === 'Paid' ? 'Payment Details' : 'Process Payment'}
              </h2>
              <p className="text-sm text-slate-500">Invoice #{invoice.invoice_number}</p>
            </div>
          </div>
          <button onClick={() => onClose(false)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[80vh]">
          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
             <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Amount to Pay</p>
                <p className="text-lg font-bold text-emerald-600">₹{invoice.grand_total ? invoice.grand_total.toLocaleString('en-IN', { minimumFractionDigits: 2 }) : '0.00'}</p>
             </div>
             <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">PO Number</p>
                <p className="text-sm font-medium text-slate-900 truncate">{invoice.po_number}</p>
             </div>
             <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Vendor</p>
                <p className="text-sm font-medium text-slate-900 truncate" title={invoice.vendor_name}>{invoice.vendor_name}</p>
             </div>
          </div>

          {invoice.status === 'Paid' ? (
            /* Read-only Payment Details */
            <div className="space-y-4">
               <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Payment Record</h4>
               <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Payment Date</span>
                    <span className="font-medium text-slate-900">{new Date(invoice.payment_date).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Mode</span>
                    <span className="font-medium text-slate-900">{invoice.payment_mode || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Bank Name</span>
                    <span className="font-medium text-slate-900">{invoice.bank_name || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Reference / UTR</span>
                    <span className="font-medium text-slate-900 bg-slate-100 px-2 py-1 rounded">{invoice.payment_reference || 'N/A'}</span>
                  </div>
                  {invoice.remarks && (
                    <div className="col-span-2">
                      <span className="block text-xs text-slate-500 mb-1">Remarks</span>
                      <span className="text-slate-700">{invoice.remarks}</span>
                    </div>
                  )}
               </div>
            </div>
          ) : (
            /* Payment Form */
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-slate-900 border-b border-slate-200 pb-2">Enter Payment Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Date *</label>
                  <input type="date" value={paymentData.payment_date} onChange={e => setPaymentData({...paymentData, payment_date: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Mode *</label>
                  <select value={paymentData.payment_mode} onChange={e => setPaymentData({...paymentData, payment_mode: e.target.value})} className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500">
                      <option value="NEFT">NEFT</option>
                      <option value="RTGS">RTGS</option>
                      <option value="IMPS">IMPS</option>
                      <option value="Cheque">Cheque</option>
                      <option value="UPI">UPI</option>
                      <option value="Cash">Cash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Bank Name *</label>
                  <input type="text" value={paymentData.bank_name} onChange={e => setPaymentData({...paymentData, bank_name: e.target.value})} placeholder="e.g. HDFC Bank" className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Payment Reference / UTR *</label>
                  <input type="text" value={paymentData.payment_reference} onChange={e => setPaymentData({...paymentData, payment_reference: e.target.value})} placeholder="e.g. UTR Number" className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Remarks</label>
                  <textarea value={paymentData.remarks} onChange={e => setPaymentData({...paymentData, remarks: e.target.value})} rows="2" placeholder="Optional notes" className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end gap-3 shrink-0">
          <button onClick={() => onClose(false)} className="px-4 py-2 text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 rounded text-sm font-medium transition-colors">
            {invoice.status === 'Paid' ? 'Close' : 'Cancel'}
          </button>
          {invoice.status !== 'Paid' && (
            <button 
              disabled={isProcessing} 
              onClick={handlePaymentSubmit} 
              className="px-4 py-2 bg-emerald-600 text-white rounded text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                  Processing...
                </>
              ) : 'Confirm Payment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
