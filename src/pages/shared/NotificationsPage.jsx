import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { useApp } from '../../context/AppContext';
import { Bell, Briefcase, Calendar, BookOpen, Video, CheckCircle, MessageSquare, Check } from 'lucide-react';

const ICONS = {
  briefcase: Briefcase,
  calendar: Calendar,
  clipboard: BookOpen,
  book: BookOpen,
  video: Video,
  'check-circle': CheckCircle,
  message: MessageSquare,
};

const TYPE_COLORS = {
  match: 'bg-primary-100 text-primary-600',
  application: 'bg-emerald-100 text-emerald-600',
  assessment: 'bg-amber-100 text-amber-600',
  course: 'bg-accent-100 text-accent-600',
  workshop: 'bg-purple-100 text-purple-600',
};

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllRead, unreadCount } = useApp();

  return (
    <DashboardLayout>
      <Topbar title="Notifications" />
      <div className="p-6 max-w-2xl mx-auto animate-fade-in">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="page-title">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-sm text-surface-500 mt-0.5">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-ghost text-xs">
              <Check size={14} /> Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-2">
          {notifications.map(notif => {
            const Icon = ICONS[notif.icon] || Bell;
            return (
              <div
                key={notif.id}
                onClick={() => markNotificationRead(notif.id)}
                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  !notif.read
                    ? 'bg-primary-50 border-primary-100 hover:bg-primary-50/70'
                    : 'bg-white border-surface-200 hover:bg-surface-50'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_COLORS[notif.type] || 'bg-surface-100 text-surface-600'}`}>
                  <Icon size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold ${!notif.read ? 'text-surface-900' : 'text-surface-700'}`}>
                      {notif.title}
                    </p>
                    <span className="text-[10px] text-surface-400 whitespace-nowrap flex-shrink-0">{notif.time}</span>
                  </div>
                  <p className="text-xs text-surface-600 mt-0.5 leading-relaxed">{notif.message}</p>
                </div>
                {!notif.read && (
                  <div className="w-2 h-2 rounded-full bg-primary-500 flex-shrink-0 mt-1.5" />
                )}
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div className="card p-16 text-center">
            <Bell size={40} className="text-surface-300 mx-auto mb-3" />
            <p className="text-surface-600 font-semibold">No notifications</p>
            <p className="text-sm text-surface-400 mt-1">You're all caught up!</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
