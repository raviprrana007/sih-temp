import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import StatCard from '../../components/cards/StatCard';
import { students } from '../../data/students';
import { skillDemandData, placementData, internshipByDept, skillDistribution, industryDemandTrends } from '../../data/analytics';
import { Users, TrendingUp, Briefcase, Award, Building2, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';

const DEPT_COLORS = ['#6366f1', '#0ea5e9', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444'];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-surface-200 rounded-xl p-3 shadow-card-md text-xs">
      <p className="font-semibold text-surface-800 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.stroke || p.fill }}>{p.name || p.dataKey}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

export default function InstitutionDashboard() {
  const placed = students.filter(s => s.status === 'Placed').length;
  const interning = students.filter(s => s.status === 'Interning').length;
  const placementRate = Math.round((placed / students.length) * 100);

  return (
    <DashboardLayout>
      <Topbar />
      <div className="p-6 space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-display font-bold text-surface-900">Institution Dashboard</h1>
          <p className="text-surface-500 text-sm mt-1">VIIT Pune · Academic Year 2025–26</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { title: 'Total Students', value: students.length, icon: Users, iconColor: 'text-primary-600', iconBg: 'bg-primary-50', trendValue: '+12%', trend: 'up', subtitle: 'from last year' },
            { title: 'Placement Rate', value: `${placementRate}%`, icon: TrendingUp, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50', trendValue: '+8%', trend: 'up', subtitle: 'YoY' },
            { title: 'Interning', value: interning, icon: Briefcase, iconColor: 'text-accent-600', iconBg: 'bg-accent-50', subtitle: 'active internships' },
            { title: 'Placed', value: placed, icon: Award, iconColor: 'text-purple-600', iconBg: 'bg-purple-50', subtitle: 'this year' },
            { title: 'Industry Partners', value: 42, icon: Building2, iconColor: 'text-amber-600', iconBg: 'bg-amber-50', trendValue: '+5', trend: 'up', subtitle: 'this year' },
            { title: 'Avg Skill Score', value: '76', icon: Star, iconColor: 'text-red-600', iconBg: 'bg-red-50', trendValue: '+4 pts', trend: 'up', subtitle: 'platform average' },
          ].map(s => <StatCard key={s.title} {...s} />)}
        </div>

        {/* Charts Row 1 */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Placement Analytics */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Placement Funnel (Aug 2026)</h2>
              <Link to="/institution/placements" className="text-xs text-primary-600 font-semibold">Full Report <ChevronRight size={12} className="inline" /></Link>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={placementData.slice(-4)} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="applied" name="Applied" fill="#e0e7ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shortlisted" name="Shortlisted" fill="#818cf8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="interviewed" name="Interviewed" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="placed" name="Placed" fill="#4338ca" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Internship by Dept */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Internships by Department</h2>
              <Link to="/institution/internships" className="text-xs text-primary-600 font-semibold">Details <ChevronRight size={12} className="inline" /></Link>
            </div>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={180}>
                <PieChart>
                  <Pie data={internshipByDept} dataKey="count" nameKey="dept" cx="50%" cy="50%" outerRadius={70} strokeWidth={2} stroke="#fff">
                    {internshipByDept.map((entry, i) => (
                      <Cell key={i} fill={DEPT_COLORS[i % DEPT_COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {internshipByDept.map((d, i) => (
                  <div key={d.dept} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: DEPT_COLORS[i % DEPT_COLORS.length] }} />
                      <span className="text-xs text-surface-600">{d.dept}</span>
                    </div>
                    <span className="text-xs font-semibold text-surface-700">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Skill Demand Trends */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Industry Skill Demand Trends</h2>
            <Link to="/institution/analytics" className="text-xs text-primary-600 font-semibold">Full Analysis <ChevronRight size={12} className="inline" /></Link>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={industryDemandTrends}>
              <defs>
                {[['aiml', '#8b5cf6'], ['cloud', '#0ea5e9'], ['webdev', '#6366f1'], ['mobile', '#10b981'], ['security', '#f59e0b']].map(([key, color]) => (
                  <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                    <stop offset="95%" stopColor={color} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {[
                { key: 'aiml', name: 'AI/ML', color: '#8b5cf6' },
                { key: 'cloud', name: 'Cloud', color: '#0ea5e9' },
                { key: 'webdev', name: 'Web Dev', color: '#6366f1' },
                { key: 'mobile', name: 'Mobile', color: '#10b981' },
                { key: 'security', name: 'Security', color: '#f59e0b' },
              ].map(({ key, name, color }) => (
                <Area key={key} type="monotone" dataKey={key} name={name} stroke={color} strokeWidth={2} fill={`url(#grad-${key})`} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Skill Demand */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="card p-5">
            <h2 className="section-title mb-4">Top In-Demand Skills</h2>
            <div className="space-y-3">
              {skillDemandData.map((item, i) => (
                <div key={item.skill} className="flex items-center gap-3">
                  <span className="text-xs text-surface-400 font-mono w-5 text-right">{i + 1}</span>
                  <span className="text-sm text-surface-700 w-28 font-medium">{item.skill}</span>
                  <div className="flex-1 h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary-500 rounded-full" style={{ width: `${item.demand}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-surface-600 w-8 text-right">{item.demand}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Students Table */}
          <div className="card overflow-hidden">
            <div className="p-4 border-b border-surface-100">
              <div className="flex items-center justify-between">
                <h2 className="section-title">Students Overview</h2>
                <Link to="/institution/students" className="text-xs text-primary-600 font-semibold">View All <ChevronRight size={12} className="inline" /></Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-surface-50">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-surface-500">Student</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-surface-500">Skill</th>
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-surface-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {students.slice(0, 6).map(s => (
                    <tr key={s.id} className="border-t border-surface-50 hover:bg-surface-50">
                      <td className="px-4 py-2.5">
                        <div className="text-xs font-semibold text-surface-800">{s.name}</div>
                        <div className="text-[10px] text-surface-400">{s.degree} · {s.batch}</div>
                      </td>
                      <td className="px-4 py-2.5 text-xs font-semibold text-surface-700">{s.skillScore}/100</td>
                      <td className="px-4 py-2.5">
                        <span className={`badge text-[10px] ${s.status === 'Placed' ? 'badge-success' : s.status === 'Interning' ? 'badge-info' : 'badge-neutral'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
