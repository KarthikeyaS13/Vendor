import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileBox, 
  ShoppingCart,
  Settings, 
  HelpCircle,
  FileText
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/portal/dashboard', icon: LayoutDashboard },
  { name: 'My Purchase Orders', path: '/portal/purchase-orders', icon: ShoppingCart },
  { name: 'My Invoices', path: '/portal/invoices', icon: FileText },
  { name: 'Settings', path: '/portal/settings', icon: Settings },
];


export default function PortalSidebar() {
  return (
    <aside className="w-64 flex flex-col border-r border-slate-200 bg-white shrink-0 md:flex hidden">
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#4c6bf4] rounded-md flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <span className="font-semibold text-lg tracking-tight">Vendor Portal</span>
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 mb-4 px-2 uppercase tracking-widest">
          Main Menu
        </div>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive 
                ? "bg-blue-50 text-blue-600 font-medium" 
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}
