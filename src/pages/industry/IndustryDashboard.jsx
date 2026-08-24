import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import StatCard from '../../components/cards/StatCard';
import CandidateCard from '../../components/cards/CandidateCard';
import { useAuth } from '../../context/AuthContext';
import { candidates, applicationsOverTime, candidateSkillDist } from '../../data/analytics';
import { Briefcase, Users, FileText, Star, TrendingUp, Plus, ChevronRight, CheckCircle } from 'lucide-react';
import { toast } from '../../components/ui/Toast';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from 'recharts';

const TOP_CANDIDATES = candidates.slice(0, 4);

export default function IndustryDashboard() {
  const { user } = useAuth();

  const handleShortlist = (c) => toast.success(`${c.name} added to shortlist!`);
  const handleContact = (c) => toast.success(`Message sent to ${c.name}!`);

  return (
    <DashboardLayout>
      <Topbar />
      <div className="p-6 space-y-6 animate-fade-in">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-surface-900">
              Welcome, {user?.company || 'TechNova Solutions'}
            </h1>
            <p className="text-surface-500 text-sm mt-1">Here's your recruitment overview</p>
          </div>
          <Link to="/industry/post-opportunity" className="btn-primary">
            <Plus size={15} /> Post Opportunity
          </Link>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { title: 'Active Jobs', value: 5, icon: Briefcase, iconColor: 'text-primary-600', iconBg: 'bg-primary-50' },
            { title: 'Active Internships', value: 3, icon: Star, iconColor: 'text-accent-600', iconBg: 'bg-accent-50' },
            { title: 'Applications', value: 247, icon: FileText, iconColor: 'text-purple-600', iconBg: 'bg-purple-50' },
            { title: 'Shortlisted', value: 34, icon: CheckCircle, iconColor: 'text-amber-600', iconBg: 'bg-amber-50' },
            { title: 'Interviews', value: 12, icon: Users, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
            { title: 'Hires This Quarter', value: 7, icon: TrendingUp, iconColor: 'text-red-600', iconBg: 'bg-red-50' },
          ].map(s => <StatCard key={s.title} {...s} />)}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <div className="card p-5">
            <h2 className="section-title mb-4">Applications Over Time</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={applicationsOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card p-5">
            <h2 className="section-title mb-4">Candidate Skill Distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={candidateSkillDist} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Bar dataKey="candidates" radius={[4, 4, 0, 0]}>
                  {candidateSkillDist.map((_, i) => (
                    <Cell key={i} fill={['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'][i % 6]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Matching Candidates */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Top Matching Candidates</h2>
            <Link to="/industry/candidates" className="text-xs text-primary-600 font-semibold flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {TOP_CANDIDATES.map(c => (
              <CandidateCard key={c.id} candidate={c} onShortlist={handleShortlist} onContact={handleContact} />
            ))}
          </div>
        </div>

        {/* Active Postings Summary */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Active Postings</h2>
            <Link to="/industry/jobs" className="text-xs text-primary-600 font-semibold flex items-center gap-1">
              Manage All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Full Stack Developer', type: 'Job', applications: 89, shortlisted: 12, status: 'active', deadline: 'Sep 30, 2026' },
              { title: 'Full Stack Developer Intern', type: 'Internship', applications: 64, shortlisted: 8, status: 'active', deadline: 'Sep 15, 2026' },
              { title: 'Backend Engineer', type: 'Job', applications: 54, shortlisted: 7, status: 'active', deadline: 'Sep 30, 2026' },
              { title: 'Cloud Engineering Intern', type: 'Internship', applications: 40, shortlisted: 7, status: 'active', deadline: 'Sep 20, 2026' },
            ].map((posting, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-surface-50 rounded-xl border border-surface-100">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-surface-800">{posting.title}</h3>
                    <span className={`badge ${posting.type === 'Job' ? 'badge-primary' : 'badge-info'}`}>{posting.type}</span>
                  </div>
                  <p className="text-xs text-surface-500 mt-0.5">Deadline: {posting.deadline}</p>
                </div>
                <div className="flex gap-4 text-center">
                  <div>
                    <div className="text-sm font-bold text-surface-800">{posting.applications}</div>
                    <div className="text-[10px] text-surface-400">Applied</div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-primary-600">{posting.shortlisted}</div>
                    <div className="text-[10px] text-surface-400">Shortlisted</div>
                  </div>
                </div>
                <span className="badge-success flex-shrink-0">{posting.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
