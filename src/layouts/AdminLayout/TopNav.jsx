import { Bell, Search, Menu, LogOut } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function TopNav() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getPageTitle = () => {
    const path = location.pathname.split('/')[1] || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b border-outline bg-surface-lowest">
      <div className="flex items-center gap-4">
        <button className="p-2 -ml-2 rounded-md hover:bg-surface-container md:hidden text-surface-on-variant">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-surface-on-variant" />
          <input 
            type="text" 
            placeholder="Search vendors, applications..." 
            className="w-full h-9 pl-9 pr-4 text-sm bg-surface-container-lowest border border-outline rounded-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
        
        <button className="relative p-2 rounded-md hover:bg-surface-container text-surface-on-variant transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full border-2 border-surface-lowest"></span>
        </button>
        
        <div className="h-8 w-px bg-outline mx-1 hidden md:block"></div>
        
        <button className="flex items-center gap-2 p-1 rounded-md hover:bg-surface-container transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary-container text-primary-on-container flex items-center justify-center font-medium text-sm">
            {user?.username ? user.username.substring(0, 2).toUpperCase() : 'U'}
          </div>
          <div className="hidden md:flex flex-col items-start mr-1">
            <span className="text-sm font-medium leading-none mb-1">{user?.username || 'User'}</span>
            <span className="text-xs text-surface-on-variant leading-none">{user?.role === 'VENDOR' ? 'Vendor' : 'Admin'}</span>
          </div>
        </button>

        <button 
          onClick={handleLogout}
          className="ml-2 p-2 rounded-md hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
