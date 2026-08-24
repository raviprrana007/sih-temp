import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import StatCard from '../../components/cards/StatCard';
import ProgressBar from '../../components/ui/ProgressBar';
import CompanyAvatar from '../../components/ui/CompanyAvatar';
import MatchScore from '../../components/ui/MatchScore';
import StatusBadge from '../../components/ui/StatusBadge';
import { useApp } from '../../context/AppContext';
import { internships } from '../../data/internships';
import { technicalSkills } from '../../data/skills';
import { courses } from '../../data/courses';
import {
  Briefcase, Target, Award, Users, TrendingUp, ArrowRight, BookOpen,
  CheckCircle, Clock, MapPin, ChevronRight, Zap, Star,
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { skillCategories } from '../../data/skills';
import { applications } from '../../data/students';

const SKILL_GAPS = technicalSkills.filter(s => s.score < s.target).slice(0, 4);
const TOP_INTERNSHIPS = internships.slice(0, 3);
const TOP_COURSES = courses.filter(c => !c.enrolled).slice(0, 3);
const RECENT_APPS = applications.slice(0, 4);

export default function StudentDashboard() {
  const { applications: apps } = useApp();

  return (
    <DashboardLayout>
      <Topbar />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-surface-900">Good morning, Ravi 👋</h1>
            <p className="text-surface-500 text-sm mt-1">Here's your career readiness overview.</p>
          </div>
          <Link to="/student/assessment" className="btn-primary">
            <Zap size={15} />
            Take Assessment
          </Link>
        </div>

        {/* KPI Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <StatCard
            title="Career Readiness"
            value="78%"
            icon={TrendingUp}
            iconColor="text-primary-600"
            iconBg="bg-primary-50"
            trendValue="+5% this month"
            trend="up"
            subtitle="vs last month"
          />
          <StatCard
            title="Skill Score"
            value="74"
            suffix="/100"
            icon={Star}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            trendValue="+8 points"
            trend="up"
            subtitle="after assessment"
          />
          <StatCard
            title="Applications"
            value={apps.length}
            icon={Briefcase}
            iconColor="text-accent-600"
            iconBg="bg-accent-50"
            subtitle={`${apps.filter(a => ['interview', 'selected'].includes(a.status)).length} active`}
          />
          <StatCard
            title="Interviews"
            value={apps.filter(a => a.status === 'interview').length}
            icon={Users}
            iconColor="text-purple-600"
            iconBg="bg-purple-50"
            subtitle="scheduled"
          />
          <StatCard
            title="Certifications"
            value="5"
            icon={Award}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50"
            subtitle="verified"
          />
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Skill Radar */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Skill Overview</h2>
              <Link to="/student/skills" className="text-xs text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
                View Profile <ChevronRight size={12} />
              </Link>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={skillCategories}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: '#64748b', fontFamily: 'Plus Jakarta Sans' }} />
                <Radar name="Score" dataKey="score" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Skill Gaps */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Skill Gaps to Close</h2>
              <Link to="/student/skill-gap" className="text-xs text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
                Full Analysis <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-4">
              {SKILL_GAPS.map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-surface-700">{skill.name}</span>
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-surface-500">{skill.score}%</span>
                      <span className="text-surface-400">→</span>
                      <span className="font-semibold text-primary-600">Target {skill.target}%</span>
                    </div>
                  </div>
                  <div className="relative h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-surface-100 rounded-full" />
                    <div className="h-full bg-surface-200 rounded-full" style={{ width: `${skill.target}%` }} />
                    <div className="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all" style={{ width: `${skill.score}%` }} />
                  </div>
                  <div className="flex justify-end mt-1.5">
                    <Link to="/student/learning" className="text-xs text-primary-600 font-semibold hover:text-primary-700">
                      Improve Skill →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Opportunities */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Recommended Opportunities</h2>
            <Link to="/student/internships" className="text-xs text-primary-600 font-semibold hover:text-primary-700 flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {TOP_INTERNSHIPS.map(opp => (
              <Link key={opp.id} to={`/student/internships`} className="group p-4 rounded-xl border border-surface-200 hover:border-primary-200 hover:bg-primary-50/30 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <CompanyAvatar logo={opp.companyLogo} color={opp.companyColor} size="sm" />
                    <div>
                      <div className="text-xs font-semibold text-surface-900">{opp.title}</div>
                      <div className="text-xs text-surface-500">{opp.company}</div>
                    </div>
                  </div>
                  <MatchScore score={opp.match} size="sm" />
                </div>
                <div className="flex items-center gap-2 text-xs text-surface-500 mb-3">
                  <MapPin size={11} className="text-surface-400" />
                  {opp.location}
                  <span className="badge-neutral ml-1">{opp.mode}</span>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {opp.skills.slice(0, 3).map(s => <span key={s} className="badge-neutral">{s}</span>)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-surface-500">{opp.stipend}</span>
                  <span className="text-xs font-semibold text-primary-600 group-hover:underline">Apply →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-5">
          {/* Recommended Learning */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Recommended Learning</h2>
              <Link to="/student/learning" className="text-xs text-primary-600 font-semibold flex items-center gap-1">
                All Courses <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {TOP_COURSES.map(course => (
                <Link key={course.id} to="/student/learning" className="flex items-center gap-3 p-3 rounded-lg hover:bg-surface-50 transition-colors group">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white text-xs" style={{ backgroundColor: course.providerColor }}>
                    {course.provider[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-surface-800 truncate">{course.title}</div>
                    <div className="flex items-center gap-2 text-xs text-surface-500 mt-0.5">
                      <span>{course.provider}</span>
                      <span>·</span>
                      <span>{course.duration}</span>
                      <span className={`badge ml-1 ${course.difficulty === 'Beginner' ? 'badge-success' : course.difficulty === 'Intermediate' ? 'badge-warning' : 'badge-danger'}`}>
                        {course.difficulty}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-primary-600 group-hover:underline whitespace-nowrap">
                    {course.price}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-title">Recent Applications</h2>
              <Link to="/student/applications" className="text-xs text-primary-600 font-semibold flex items-center gap-1">
                All Apps <ChevronRight size={12} />
              </Link>
            </div>
            <div className="space-y-3">
              {RECENT_APPS.map(app => (
                <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg border border-surface-100">
                  <CompanyAvatar logo={app.companyLogo} color={app.companyColor} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-surface-800 truncate">{app.role}</div>
                    <div className="text-xs text-surface-500">{app.company}</div>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
