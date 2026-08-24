import { Bell, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';

export default function Topbar({ title }) {
  const { user } = useAuth();
  const { unreadCount } = useApp();

  return (
    <header className="h-16 bg-white border-b border-surface-200 flex items-center px-6 gap-4 sticky top-0 z-30">
      <div className="flex-1">
        {title && <h1 className="text-base font-display font-semibold text-surface-800">{title}</h1>}
      </div>

      <div className="hidden md:flex items-center gap-2">
        <Link
          to={`/${user?.role}/notifications`}
          className="relative btn-ghost p-2"
        >
          <Bell size={18} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Link>

        <div className="flex items-center gap-2 pl-3 border-l border-surface-200">
          <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
            <span className="text-xs font-bold text-primary-700">{user?.name?.[0] || 'U'}</span>
          </div>
          <div className="hidden lg:block">
            <div className="text-sm font-semibold text-surface-800 leading-none">{user?.name}</div>
            <div className="text-xs text-surface-400 capitalize leading-none mt-0.5">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
