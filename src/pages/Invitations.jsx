import React, { useState, useEffect } from 'react';
import { Mail, Plus, Search, RefreshCw, Copy, Send } from 'lucide-react';
import { invitationService } from '../services/invitationService';
import InviteVendorModal from '../components/Invitations/InviteVendorModal';
import { Toaster, toast } from 'react-hot-toast';

export default function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadInvitations = async () => {
    setLoading(true);
    try {
      const data = await invitationService.getInvitations();
      setInvitations(data);
    } catch (err) {
      toast.error('Failed to load invitations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  const copyLink = (token) => {
    const url = `${window.location.origin}/register/${token}`;
    navigator.clipboard.writeText(url);
    toast.success('Registration link copied to clipboard');
  };

  const getStatusBadge = (status) => {
    const styles = {
      Pending: 'bg-amber-100 text-amber-700 border-amber-200',
      Opened: 'bg-blue-100 text-blue-700 border-blue-200',
      Completed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      Expired: 'bg-rose-100 text-rose-700 border-rose-200',
      Cancelled: 'bg-slate-100 text-slate-700 border-slate-200'
    };
    const style = styles[status] || styles.Pending;
    return (
      <span className={`px-2.5 py-1 text-xs font-medium border rounded-full ${style}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="p-8">
      <Toaster position="top-right" />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Invitations</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage invitations and registration links for new vendors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => loadInvitations()}
            className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
            title="Refresh list"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-600/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Invite Vendor
          </button>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by company or email..." 
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select className="border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Opened">Opened</option>
          <option value="Completed">Completed</option>
          <option value="Expired">Expired</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700">Company</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Contact Person</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Sent Date</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Expiry</th>
                <th className="px-6 py-4 font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                  </td>
                </tr>
              ) : invitations.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-900 font-medium">No invitations found</p>
                    <p className="text-slate-500 text-sm mt-1">Click "Invite Vendor" to get started.</p>
                  </td>
                </tr>
              ) : (
                invitations.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{inv.companyName}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{inv.invitationId}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-900">{inv.contactPerson}</div>
                      <div className="text-slate-500 text-xs mt-0.5">{inv.email}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(inv.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(inv.expires_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(inv.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => copyLink(inv.token)}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Copy Link"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        {inv.status !== 'Completed' && (
                          <button 
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Resend Email"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <InviteVendorModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={loadInvitations}
      />
    </div>
  );
}
