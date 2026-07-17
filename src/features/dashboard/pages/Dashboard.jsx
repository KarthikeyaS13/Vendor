import { useState, useEffect } from 'react';
import { ArrowRight, FileText, ClipboardList, ListX, Clock, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { dashboardService } from '../services/dashboardService';
import { Skeleton, TableRowSkeleton, ActivitySkeleton } from '../../../components/ui/Skeleton';
import { EmptyState } from '../../../components/ui/EmptyState';
import { ErrorState } from '../../../components/ui/ErrorState';
import InviteVendorModal from '../../../components/Invitations/InviteVendorModal';

// Helper to resolve icon from string if API provides string names
const iconMap = {
  Clock, CheckCircle2, XCircle, AlertCircle
};

export default function Dashboard() {
  const [stats, setStats] = useState({ data: [], isLoading: true, error: null });
  const [queue, setQueue] = useState({ data: [], isLoading: true, error: null });
  const [activities, setActivities] = useState({ data: [], isLoading: true, error: null });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const loadData = () => {
    // Fetch Stats
    setStats(prev => ({ ...prev, isLoading: true, error: null }));
    dashboardService.getStats()
      .then(data => setStats({ data: data || [], isLoading: false, error: null }))
      .catch(err => setStats({ data: [], isLoading: false, error: err.message }));

    // Fetch Queue
    setQueue(prev => ({ ...prev, isLoading: true, error: null }));
    dashboardService.getApprovalQueue()
      .then(data => setQueue({ data: data || [], isLoading: false, error: null }))
      .catch(err => setQueue({ data: [], isLoading: false, error: err.message }));

    // Fetch Activities
    setActivities(prev => ({ ...prev, isLoading: true, error: null }));
    dashboardService.getRecentActivities()
      .then(data => setActivities({ data: data || [], isLoading: false, error: null }))
      .catch(err => setActivities({ data: [], isLoading: false, error: err.message }));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-surface-on">Procurement Dashboard</h2>
          <p className="text-surface-on-variant mt-1">Overview of vendor onboarding and compliance.</p>
        </div>
        <button 
          onClick={() => setIsInviteModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-on px-4 py-2 rounded-md font-medium text-sm transition-colors shadow-sm inline-flex items-center justify-center">
          Invite Vendor
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-lowest border border-outline rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          ))
        ) : stats.error ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-surface-lowest border border-outline rounded-xl">
             <ErrorState title="Failed to load statistics" message={stats.error} onRetry={loadData} />
          </div>
        ) : stats.data.length === 0 ? (
          <div className="col-span-1 sm:col-span-2 lg:col-span-4 bg-surface-lowest border border-outline rounded-xl">
             <EmptyState title="No Statistics" description="No key metrics are available at this time." />
          </div>
        ) : (
          stats.data.map((stat) => {
            const Icon = iconMap[stat.icon] || FileText;
            return (
              <div key={stat.name} className="bg-surface-lowest border border-outline rounded-xl p-5 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                    <div className="text-sm font-medium text-surface-on-variant mt-1">{stat.name}</div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Approval Queue */}
          <div className="bg-surface-lowest border border-outline rounded-xl shadow-sm overflow-hidden min-h-[300px] flex flex-col">
            <div className="px-6 py-4 border-b border-outline flex items-center justify-between">
              <h3 className="text-base font-semibold">Approval Queue</h3>
              <button className="text-sm font-medium text-primary hover:text-primary/80" disabled={queue.isLoading}>
                View All
              </button>
            </div>
            
            <div className="flex-1 overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-surface text-xs uppercase font-semibold text-surface-on-variant">
                  <tr>
                    <th className="px-6 py-3 border-b border-outline">Application</th>
                    <th className="px-6 py-3 border-b border-outline">Vendor</th>
                    <th className="px-6 py-3 border-b border-outline">Category</th>
                    <th className="px-6 py-3 border-b border-outline">Submitted</th>
                    <th className="px-6 py-3 border-b border-outline text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {queue.isLoading ? (
                    Array.from({ length: 3 }).map((_, i) => <TableRowSkeleton key={i} />)
                  ) : queue.error ? (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <ErrorState title="Failed to load queue" message={queue.error} onRetry={loadData} />
                      </td>
                    </tr>
                  ) : queue.data.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-0">
                        <EmptyState icon={ClipboardList} title="No Pending Approvals" description="There are no vendor applications awaiting your review." />
                      </td>
                    </tr>
                  ) : (
                    queue.data.map((item) => (
                      <tr key={item.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-3 font-medium">{item.id}</td>
                        <td className="px-6 py-3">{item.name}</td>
                        <td className="px-6 py-3 text-surface-on-variant">{item.category}</td>
                        <td className="px-6 py-3 text-surface-on-variant">{item.submitted}</td>
                        <td className="px-6 py-3 text-right">
                          <button className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1">
                            Review <ArrowRight className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Charts Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-lowest border border-outline rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
              <h3 className="text-base font-semibold mb-4">Vendor Onboarding Trend</h3>
              <div className="flex-1 border border-outline rounded-lg flex flex-col">
                <EmptyState icon={ListX} title="No Data Available" description="Not enough data to generate trends." />
              </div>
            </div>
            <div className="bg-surface-lowest border border-outline rounded-xl p-6 shadow-sm min-h-[300px] flex flex-col">
              <h3 className="text-base font-semibold mb-4">Category Breakdown</h3>
              <div className="flex-1 border border-outline rounded-lg flex flex-col">
                 <EmptyState icon={ListX} title="No Data Available" description="No categories to display." />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <div className="bg-surface-lowest border border-outline rounded-xl shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-outline">
              <h3 className="text-base font-semibold">Recent Activities</h3>
            </div>
            <div className="p-6 flex-1">
              {activities.isLoading ? (
                <div className="ml-3 border-l-2 border-outline/50 space-y-6">
                   {Array.from({ length: 4 }).map((_, i) => <ActivitySkeleton key={i} />)}
                </div>
              ) : activities.error ? (
                <ErrorState title="Failed to load activity" message={activities.error} onRetry={loadData} />
              ) : activities.data.length === 0 ? (
                <EmptyState title="No Recent Activities" description="There is no recent activity to show." />
              ) : (
                <div className="relative border-l-2 border-outline/50 ml-3 space-y-6">
                  {activities.data.map((activity) => (
                    <div key={activity.id} className="relative pl-6">
                      <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-surface-lowest border-2 border-primary"></span>
                      <div className="text-sm text-surface-on mb-1 leading-relaxed">
                        {activity.text}
                      </div>
                      <div className="text-xs font-medium text-surface-on-variant">
                        {activity.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-6 py-3 border-t border-outline bg-surface text-center">
              <button className="text-sm font-medium text-primary hover:text-primary/80" disabled={activities.isLoading}>
                View All Activity
              </button>
            </div>
          </div>

          {/* Quick Actions (Still static UI, but considered functional shortcuts) */}
          <div className="bg-surface-lowest border border-outline rounded-xl p-6 shadow-sm">
             <h3 className="text-base font-semibold mb-4">Quick Links</h3>
             <div className="space-y-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-outline hover:border-primary hover:bg-primary-container/5 transition-all text-left">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-surface-on">Privacy Policy</div>
                    <div className="text-xs text-surface-on-variant">Update organization policies</div>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-outline hover:border-primary hover:bg-primary-container/5 transition-all text-left">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium text-surface-on">Terms of Service</div>
                    <div className="text-xs text-surface-on-variant">Manage vendor agreements</div>
                  </div>
                </button>
             </div>
          </div>
        </div>
      </div>

      <InviteVendorModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        onSuccess={() => {}}
      />
    </div>
  );
}
