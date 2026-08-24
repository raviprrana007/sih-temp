import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import ProgressBar from '../../components/ui/ProgressBar';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { Target, BookOpen, CheckCircle, ArrowRight, ChevronDown, ChevronUp, TrendingUp } from 'lucide-react';

const GOAL = 'Full Stack Developer';

const GAP_DATA = [
  { skill: 'JavaScript', yours: 85, required: 90, gap: 5 },
  { skill: 'React', yours: 72, required: 85, gap: 13 },
  { skill: 'Node.js', yours: 52, required: 80, gap: 28 },
  { skill: 'PostgreSQL', yours: 68, required: 75, gap: 7 },
  { skill: 'Git', yours: 90, required: 80, gap: -10 },
  { skill: 'REST APIs', yours: 75, required: 80, gap: 5 },
  { skill: 'System Design', yours: 42, required: 70, gap: 28 },
  { skill: 'AWS', yours: 35, required: 65, gap: 30 },
];

const PLAN = [
  { step: 1, title: 'Master Node.js Fundamentals', detail: 'Complete "The Complete Node.js Developer Course" on Udemy. Focus on async programming, Express.js, and REST API development.', duration: '4 weeks', priority: 'High', action: 'Start Course', link: '/student/learning' },
  { step: 2, title: 'Build 2 Full-Stack Projects', detail: 'Apply your knowledge by building end-to-end projects using React, Node.js, and PostgreSQL. Deploy on Vercel + Railway.', duration: '3 weeks', priority: 'High', action: 'View Projects', link: '/student/portfolio' },
  { step: 3, title: 'Learn PostgreSQL Advanced Topics', detail: 'Study indexing, query optimization, and database design. Take the "PostgreSQL for Beginners to Advanced" course.', duration: '2 weeks', priority: 'Medium', action: 'Start Course', link: '/student/learning' },
  { step: 4, title: 'Study System Design Principles', detail: 'Read "System Design Interview" book and practice on ByteByteGo. Focus on designing scalable web applications.', duration: '4 weeks', priority: 'Medium', action: 'Explore Resources', link: '/student/learning' },
  { step: 5, title: 'Get AWS Certified Developer Associate', detail: 'Cloud skills are critical for full-stack roles. Prepare for AWS CDA certification to strengthen your profile.', duration: '6 weeks', priority: 'Medium', action: 'View Certification', link: '/student/learning' },
  { step: 6, title: 'Complete Full-Stack Skill Assessment', detail: 'After completing the above, retake the SkillBridge assessment to verify your improved skill score.', duration: '1 day', priority: 'Low', action: 'Take Assessment', link: '/student/assessment' },
];

const PRIORITY_STYLES = {
  High: 'badge-danger',
  Medium: 'badge-warning',
  Low: 'badge-success',
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-white border border-surface-200 rounded-xl p-3 shadow-card-md text-xs">
      <p className="font-semibold text-surface-800 mb-2">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill }}>{p.name}: <strong>{p.value}%</strong></p>
      ))}
    </div>
  );
};

export default function SkillGapAnalysis() {
  const [expanded, setExpanded] = useState(null);

  const meetsRequirement = GAP_DATA.filter(s => s.yours >= s.required).length;
  const totalGap = GAP_DATA.filter(s => s.gap > 0).reduce((acc, s) => acc + s.gap, 0);

  return (
    <DashboardLayout>
      <Topbar title="Skill Gap Analysis" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="card p-5 bg-gradient-to-r from-primary-50 to-accent-50 border-primary-100">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold text-primary-600 uppercase tracking-wide mb-1">Your Career Goal</p>
              <h2 className="text-xl font-display font-bold text-surface-900 flex items-center gap-2">
                <Target size={20} className="text-primary-600" />
                {GOAL}
              </h2>
              <p className="text-sm text-surface-600 mt-1">Based on industry requirements from 150+ {GOAL} job postings</p>
            </div>
            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-emerald-600">{meetsRequirement}</div>
                <div className="text-xs text-surface-500">Skills Met</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-red-600">{GAP_DATA.length - meetsRequirement}</div>
                <div className="text-xs text-surface-500">Gaps Found</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-primary-600">78%</div>
                <div className="text-xs text-surface-500">Career Readiness</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="card p-5">
          <h2 className="section-title mb-1">Skill Comparison: You vs. Industry Benchmark</h2>
          <p className="text-xs text-surface-500 mb-5">Dark bars = your score, light bars = industry requirement for {GOAL}</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={GAP_DATA} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="skill" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="yours" name="Your Score" radius={[4, 4, 0, 0]}>
                {GAP_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.yours >= entry.required ? '#10b981' : '#6366f1'} />
                ))}
              </Bar>
              <Bar dataKey="required" name="Required" radius={[4, 4, 0, 0]} fill="#e2e8f0" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gap Table */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-surface-100">
            <h2 className="section-title">Skill Gap Details</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-surface-50 border-b border-surface-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide">Skill</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide">Your Score</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide">Required</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide">Gap</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-surface-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {GAP_DATA.map((row, i) => (
                  <tr key={i} className="border-b border-surface-50 hover:bg-surface-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-surface-800">{row.skill}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-surface-700 w-8">{row.yours}%</span>
                        <div className="w-24 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${row.yours}%`, backgroundColor: row.yours >= row.required ? '#10b981' : '#6366f1' }} />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-surface-600">{row.required}%</td>
                    <td className="px-5 py-3.5">
                      {row.gap <= 0 ? (
                        <span className="text-sm font-semibold text-emerald-600">+{Math.abs(row.gap)}% above</span>
                      ) : (
                        <span className="text-sm font-semibold text-red-500">-{row.gap}%</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {row.gap <= 0 ? (
                        <span className="badge-success flex items-center gap-1 w-fit">
                          <CheckCircle size={11} /> Met
                        </span>
                      ) : row.gap <= 10 ? (
                        <span className="badge-warning">Needs Improvement</span>
                      ) : (
                        <span className="badge-danger">Critical Gap</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Improvement Plan */}
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-5">
            <TrendingUp size={20} className="text-primary-600" />
            <div>
              <h2 className="section-title">Recommended Improvement Plan</h2>
              <p className="text-xs text-surface-500">Estimated time to role readiness: 12–16 weeks</p>
            </div>
          </div>
          <div className="space-y-3">
            {PLAN.map((item, i) => (
              <div key={i} className={`border rounded-xl overflow-hidden transition-all ${expanded === i ? 'border-primary-200 shadow-card-md' : 'border-surface-200'}`}>
                <button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-surface-50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-primary-100 text-primary-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-surface-800">{item.title}</span>
                      <span className={PRIORITY_STYLES[item.priority]}>{item.priority} Priority</span>
                    </div>
                    <p className="text-xs text-surface-500 mt-0.5">{item.duration}</p>
                  </div>
                  {expanded === i ? <ChevronUp size={16} className="text-surface-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-surface-400 flex-shrink-0" />}
                </button>
                {expanded === i && (
                  <div className="px-4 pb-4 border-t border-surface-100 pt-3 animate-slide-up">
                    <p className="text-sm text-surface-600 mb-3">{item.detail}</p>
                    <Link to={item.link} className="btn-primary py-2 text-xs">
                      <BookOpen size={13} />
                      {item.action} <ArrowRight size={12} />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
