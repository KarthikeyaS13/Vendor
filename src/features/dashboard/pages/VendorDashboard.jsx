import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ShoppingCart, FileText, FileBox, AlertCircle } from 'lucide-react';

export default function VendorDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    poCount: 0,
    invoiceCount: 0,
    documentCount: 0
  });

  useEffect(() => {
    // In a real implementation, we would fetch these from the backend.
    // For now, we will mock them or we can implement real endpoints later.
    // Let's try to fetch real PO count
    const fetchStats = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const res = await fetch('/api/purchase-orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (res.ok) {
          const data = await res.json();
          // Assuming data is an array of POs
          setStats(prev => ({ ...prev, poCount: data.length }));
        }
      } catch (e) {
        console.error("Failed to fetch dashboard stats", e);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.username}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Total Purchase Orders</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.poCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Invoices Submitted</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.invoiceCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <FileBox className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Documents Uploaded</p>
              <h3 className="text-2xl font-bold text-slate-900">{stats.documentCount}</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h2>
        <div className="text-slate-500 flex flex-col items-center justify-center py-8">
          <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
          <p>No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}
