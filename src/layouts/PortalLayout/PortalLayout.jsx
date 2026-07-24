import { Outlet } from 'react-router-dom';
import PortalSidebar from './PortalSidebar';
import TopNav from '../AdminLayout/TopNav'; // Reusing TopNav for now, or we can make PortalTopNav later

export default function PortalLayout() {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-900">
      <PortalSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
