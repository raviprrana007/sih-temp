import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { useAuth } from '../../context/AuthContext';
import { toast } from '../../components/ui/Toast';
import { User, Bell, Shield, LogOut, Save, ChevronRight } from 'lucide-react';

export default function SettingsPage() {
  const { user, logout, updateUser } = useAuth();
  const [section, setSection] = useState('profile');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [notifications, setNotifications] = useState({
    jobMatches: true, applicationUpdates: true, interviews: true, courses: false, workshops: false,
  });

  const handleSave = () => {
    updateUser({ name, email });
    toast.success('Settings saved successfully!');
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <DashboardLayout>
      <Topbar title="Settings" />
      <div className="p-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="page-title mb-6">Settings</h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-48 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map(s => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSection(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${section === s.id ? 'bg-primary-50 text-primary-700' : 'text-surface-600 hover:bg-surface-100'}`}
                  >
                    <Icon size={16} />
                    {s.label}
                  </button>
                );
              })}
              <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all">
                <LogOut size={16} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {section === 'profile' && (
              <div className="card p-6 space-y-5">
                <h2 className="section-title">Profile Information</h2>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-700">{name?.[0] || 'U'}</span>
                  </div>
                  <div>
                    <button className="btn-secondary text-xs">Change Photo</button>
                    <p className="text-xs text-surface-400 mt-1">JPG, PNG up to 2MB</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Full Name</label>
                    <input className="input" value={name} onChange={e => setName(e.target.value)} />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="label">Email</label>
                    <input type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Role</label>
                    <input className="input bg-surface-50" value={user?.role} readOnly />
                  </div>
                </div>
                <button onClick={handleSave} className="btn-primary">
                  <Save size={15} /> Save Changes
                </button>
              </div>
            )}

            {section === 'notifications' && (
              <div className="card p-6 space-y-5">
                <h2 className="section-title">Notification Preferences</h2>
                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => {
                    const labels = {
                      jobMatches: { title: 'Job & Internship Matches', desc: 'New opportunities matching your skill profile' },
                      applicationUpdates: { title: 'Application Updates', desc: 'Status changes for your applications' },
                      interviews: { title: 'Interview Invitations', desc: 'Interview scheduling and reminders' },
                      courses: { title: 'Course Recommendations', desc: 'New courses based on your skill gaps' },
                      workshops: { title: 'Workshops & Events', desc: 'Upcoming workshops and industry events' },
                    };
                    return (
                      <div key={key} className="flex items-center justify-between p-4 bg-surface-50 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-surface-800">{labels[key].title}</p>
                          <p className="text-xs text-surface-500 mt-0.5">{labels[key].desc}</p>
                        </div>
                        <button
                          onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                          className={`relative w-10 h-5.5 rounded-full transition-all ${value ? 'bg-primary-600' : 'bg-surface-300'}`}
                          style={{ height: '22px' }}
                        >
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-4.5' : ''}`} style={{ transform: value ? 'translateX(18px)' : 'translateX(0)' }} />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button onClick={() => toast.success('Preferences saved!')} className="btn-primary">
                  <Save size={15} /> Save Preferences
                </button>
              </div>
            )}

            {section === 'security' && (
              <div className="card p-6 space-y-5">
                <h2 className="section-title">Security Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label">Current Password</label>
                    <input type="password" className="input" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input type="password" className="input" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="label">Confirm New Password</label>
                    <input type="password" className="input" placeholder="Confirm new password" />
                  </div>
                  <button onClick={() => toast.success('Password updated!')} className="btn-primary">
                    <Save size={15} /> Update Password
                  </button>
                </div>
                <div className="pt-4 border-t border-surface-100">
                  <h3 className="text-sm font-semibold text-surface-700 mb-3">Danger Zone</h3>
                  <button className="btn-danger text-xs" onClick={() => toast.warning('Feature coming soon')}>
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
