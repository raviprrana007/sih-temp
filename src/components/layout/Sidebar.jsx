import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, User, ClipboardList, BarChart2, Target, Briefcase,
  BookOpen, Award, FolderOpen, Users, Bell, Settings, LogOut, ChevronLeft,
  ChevronRight, Building2, Search, PlusCircle, TrendingUp, GraduationCap,
  BookMarked, FlaskConical, Handshake, BarChart3, FileText, Cpu, ChevronDown,
  Layers, CalendarDays, MessageSquare, Lightbulb, Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

const NAV_STUDENT = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/student' },
  { label: 'My Profile', icon: User, path: '/student/profile' },
  { label: 'Divider', type: 'divider', label2: 'Skills' },
  { label: 'Skill Assessment', icon: ClipboardList, path: '/student/assessment' },
  { label: 'Skill Profile', icon: BarChart2, path: '/student/skills' },
  { label: 'Skill Gap Analysis', icon: Target, path: '/student/skill-gap' },
  { label: 'Divider', type: 'divider', label2: 'Opportunities' },
  { label: 'Internships', icon: Briefcase, path: '/student/internships' },
  { label: 'Jobs', icon: Building2, path: '/student/jobs' },
  { label: 'Applications', icon: FileText, path: '/student/applications' },
  { label: 'Divider', type: 'divider', label2: 'Growth' },
  { label: 'Learning Programs', icon: BookOpen, path: '/student/learning' },
  { label: 'Digital Portfolio', icon: FolderOpen, path: '/student/portfolio' },
  { label: 'Mentorship', icon: Users, path: '/student/mentorship' },
];

const NAV_INDUSTRY = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/industry' },
  { label: 'Company Profile', icon: Building, path: '/industry/profile' },
  { label: 'Divider', type: 'divider', label2: 'Recruitment' },
  { label: 'Post Opportunity', icon: PlusCircle, path: '/industry/post-opportunity' },
  { label: 'Manage Postings', icon: Layers, path: '/industry/jobs' },
  { label: 'Applications', icon: FileText, path: '/industry/applications' },
  { label: 'Candidate Discovery', icon: Search, path: '/industry/candidates' },
  { label: 'Divider', type: 'divider', label2: 'Collaboration' },
  { label: 'Mentorship', icon: Users, path: '/industry/mentorship' },
  { label: 'Workshops', icon: CalendarDays, path: '/industry/workshops' },
  { label: 'Live Projects', icon: Cpu, path: '/industry/live-projects' },
  { label: 'Analytics', icon: TrendingUp, path: '/industry/analytics' },
];

const NAV_ACADEMICIAN = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/academician' },
  { label: 'Faculty Profile', icon: User, path: '/academician/profile' },
  { label: 'Divider', type: 'divider', label2: 'Opportunities' },
  { label: 'Faculty Internships', icon: Briefcase, path: '/academician/opportunities' },
  { label: 'FDP Programs', icon: GraduationCap, path: '/academician/fdp' },
  { label: 'Workshops', icon: CalendarDays, path: '/academician/workshops' },
  { label: 'Consultancy', icon: Handshake, path: '/academician/consultancy' },
  { label: 'Divider', type: 'divider', label2: 'Research' },
  { label: 'Research Collaboration', icon: FlaskConical, path: '/academician/research' },
  { label: 'Industry Projects', icon: Cpu, path: '/academician/projects' },
  { label: 'Applications', icon: FileText, path: '/academician/applications' },
];

const NAV_INSTITUTION = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/institution' },
  { label: 'Student Management', icon: Users, path: '/institution/students' },
  { label: 'Divider', type: 'divider', label2: 'Analytics' },
  { label: 'Skill Analytics', icon: BarChart2, path: '/institution/analytics' },
  { label: 'Placement Analytics', icon: TrendingUp, path: '/institution/placements' },
  { label: 'Internship Analytics', icon: Briefcase, path: '/institution/internships' },
  { label: 'Divider', type: 'divider', label2: 'Industry' },
  { label: 'Industry Partners', icon: Building2, path: '/institution/industry' },
  { label: 'Training Programs', icon: BookMarked, path: '/institution/training' },
  { label: 'Reports', icon: FileText, path: '/institution/reports' },
];

const navByRole = {
  student: NAV_STUDENT,
  industry: NAV_INDUSTRY,
  academician: NAV_ACADEMICIAN,
  institution: NAV_INSTITUTION,
};

export default function Sidebar({ collapsed, setCollapsed }) {
  const { user, logout } = useAuth();
  const { unreadCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const nav = navByRole[user?.role] || NAV_STUDENT;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-surface-200 flex flex-col z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-surface-100 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-display font-bold text-sm">S</span>
        </div>
        {!collapsed && (
          <div>
            <div className="font-display font-bold text-surface-900 text-sm leading-none">SkillBridge</div>
            <div className="text-xs text-surface-400 font-medium">Academia × Industry</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto scrollbar-thin py-3 px-2">
        {nav.map((item, i) => {
          if (item.type === 'divider') {
            if (collapsed) return <div key={i} className="my-2 border-t border-surface-100 mx-2" />;
            return (
              <div key={i} className="px-3 pt-4 pb-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-surface-400">{item.label2}</span>
              </div>
            );
          }
          const Icon = item.icon;
          const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path) && item.path !== '/student' && item.path !== '/industry' && item.path !== '/academician' && item.path !== '/institution');
          const exactActive = location.pathname === item.path;
          const isActive = exactActive || (!['Dashboard'].includes(item.label) && location.pathname.startsWith(item.path));

          return (
            <Link
              key={i}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={`${isActive ? 'sidebar-link-active' : 'sidebar-link'} ${collapsed ? 'justify-center px-2' : ''} mb-0.5`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
              {!collapsed && item.label === 'Applications' && unreadCount > 0 && (
                <span className="ml-auto bg-primary-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">{unreadCount}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="border-t border-surface-100 p-2 space-y-0.5">
        <Link
          to={`/${user?.role}/notifications`}
          className={`sidebar-link relative ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Notifications' : undefined}
        >
          <Bell size={18} />
          {!collapsed && <span>Notifications</span>}
          {unreadCount > 0 && (
            <span className={`bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold ${collapsed ? 'absolute -top-0.5 -right-0.5 w-4 h-4' : 'ml-auto w-4 h-4'}`}>
              {unreadCount}
            </span>
          )}
        </Link>
        <Link
          to={`/${user?.role}/settings`}
          className={`sidebar-link ${collapsed ? 'justify-center px-2' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </Link>

        {!collapsed && (
          <div className="px-3 py-2 mt-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-xs font-bold text-primary-700">{user?.name?.[0] || 'U'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-surface-800 truncate">{user?.name}</div>
                <div className="text-[10px] text-surface-400 capitalize">{user?.role}</div>
              </div>
              <button onClick={handleLogout} className="text-surface-400 hover:text-red-500 transition-colors">
                <LogOut size={14} />
              </button>
            </div>
          </div>
        )}

        {collapsed && (
          <button onClick={handleLogout} className="sidebar-link justify-center px-2 w-full" title="Logout">
            <LogOut size={18} />
          </button>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-white border border-surface-200 rounded-full flex items-center justify-center text-surface-400 hover:text-surface-700 hover:bg-surface-50 transition-all shadow-sm"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
