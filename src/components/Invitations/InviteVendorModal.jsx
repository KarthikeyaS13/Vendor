import React, { useState } from 'react';
import { X, HelpCircle, UserPlus } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import toast from 'react-hot-toast';

export default function InviteVendorModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await invitationService.createInvitation(formData);
      if (response && response.previewUrl) {
        toast.success((t) => (
          <span>
            Invitation sent! <a href={response.previewUrl} target="_blank" rel="noreferrer" className="underline text-blue-600 font-medium ml-1">Click here to view Email</a>
          </span>
        ), { duration: 10000 });
      } else {
        toast.success('Invitation sent successfully!');
      }
      if (onSuccess) onSuccess();
      onClose();
      setFormData({ companyName: '', email: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send invitation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-slate-700" />
            <h2 className="text-lg font-semibold text-slate-800">Invite Vendor</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <h3 className="text-center text-lg font-semibold text-slate-800 mb-6">Invite Vendor Form</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-4 border-b border-slate-100 pb-4">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                Vendor Type
                <HelpCircle className="w-3 h-3 text-blue-500 cursor-help" />
              </label>
              <div className="text-sm text-slate-600">Create New Vendor</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-4 border-b border-slate-100 pb-4">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                Company Name
                <HelpCircle className="w-3 h-3 text-blue-500 cursor-help" />
              </label>
              <input 
                type="text" 
                required
                className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                value={formData.companyName}
                onChange={e => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] items-center gap-4 border-b border-slate-100 pb-4">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-1">
                Email
                <HelpCircle className="w-3 h-3 text-blue-500 cursor-help" />
              </label>
              <input 
                type="email" 
                required
                className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-colors"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="mt-6 flex gap-2">
              <button 
                type="submit" 
                disabled={loading}
                className="px-4 py-2 rounded bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center"
              >
                {loading ? 'Sending...' : 'Send Invitation'}
              </button>
              <button 
                type="button" 
                onClick={onClose}
                className="px-4 py-2 rounded bg-slate-200 text-slate-700 text-sm font-medium hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
