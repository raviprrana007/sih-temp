import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { technicalSkills, softSkills, skillCategories, careerCompatibility } from '../../data/skills';
import { certifications } from '../../data/courses';
import ProgressBar from '../../components/ui/ProgressBar';
import { CheckCircle, Shield, FileText, Cpu, Award } from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell,
} from 'recharts';

const VERIFIED_ICONS = {
  'Assessment Verified': { icon: CheckCircle, color: 'text-primary-600', bg: 'bg-primary-50' },
  'Certificate Verified': { icon: Award, color: 'text-amber-600', bg: 'bg-amber-50' },
  'Project Verified': { icon: Cpu, color: 'text-purple-600', bg: 'bg-purple-50' },
};

const COLORS = ['#6366f1', '#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

export default function SkillProfile() {
  return (
    <DashboardLayout>
      <Topbar title="Skill Profile" />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Overall Score */}
        <div className="card p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative flex-shrink-0">
              <svg width={120} height={120} viewBox="0 0 120 120">
                <circle cx={60} cy={60} r={52} fill="none" stroke="#e2e8f0" strokeWidth={10} />
                <circle
                  cx={60} cy={60} r={52} fill="none" stroke="#6366f1" strokeWidth={10}
                  strokeDasharray={`${2 * Math.PI * 52 * 0.74} ${2 * Math.PI * 52 * 0.26}`}
                  strokeDashoffset={2 * Math.PI * 52 * 0.25}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.8s ease' }}
                />
                <text x={60} y={58} textAnchor="middle" className="font-display font-bold" style={{ fontSize: 28, fill: '#1e293b', fontFamily: 'Syne' }}>74</text>
                <text x={60} y={74} textAnchor="middle" style={{ fontSize: 11, fill: '#64748b', fontFamily: 'Plus Jakarta Sans' }}>/100</text>
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-display font-bold text-surface-900 mb-1">Overall Skill Score</h2>
              <p className="text-surface-500 text-sm mb-4">Based on assessment, certifications, and project verification</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Technical', score: 72, color: 'text-primary-600', bg: 'bg-primary-50' },
                  { label: 'Soft Skills', score: 79, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { label: 'Projects', score: 81, color: 'text-purple-600', bg: 'bg-purple-50' },
                  { label: 'Certifications', score: 70, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map(item => (
                  <div key={item.label} className={`${item.bg} rounded-lg px-3 py-2`}>
                    <div className={`text-lg font-display font-bold ${item.color}`}>{item.score}</div>
                    <div className="text-xs text-surface-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-5">
          {/* Technical Skills */}
          <div className="card p-5">
            <h2 className="section-title mb-4">Technical Skills</h2>
            <div className="space-y-4">
              {technicalSkills.map(skill => (
                <div key={skill.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-surface-700">{skill.name}</span>
                      {skill.verified && (
                        <span className="badge-success text-[10px] px-1.5">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-surface-500">
                      <span className={`badge ${skill.level === 'Advanced' ? 'badge-primary' : skill.level === 'Intermediate' ? 'badge-info' : 'badge-neutral'}`}>
                        {skill.level}
                      </span>
                      <span className="font-semibold text-surface-700 w-8 text-right">{skill.score}%</span>
                    </div>
                  </div>
                  <ProgressBar value={skill.score} color={skill.score >= 80 ? 'success' : skill.score >= 60 ? 'primary' : 'warning'} height="md" />
                </div>
              ))}
            </div>
          </div>

          {/* Soft Skills Radar */}
          <div className="card p-5">
            <h2 className="section-title mb-4">Soft Skills</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={softSkills.map(s => ({ subject: s.name, score: s.score }))}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                <Radar dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {softSkills.map(skill => (
                <div key={skill.name} className="flex items-center justify-between p-2 bg-surface-50 rounded-lg">
                  <span className="text-xs text-surface-600">{skill.name}</span>
                  <span className="text-xs font-bold text-surface-800">{skill.score}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Career Compatibility */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Career Compatibility</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {careerCompatibility.map((item, i) => (
              <div key={item.role} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                  <span className="text-xs font-bold" style={{ color: item.color }}>{i + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-surface-800 mb-1">{item.role}</div>
                  <div className="h-1.5 bg-surface-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.match}%`, backgroundColor: item.color }} />
                  </div>
                </div>
                <span className="text-sm font-bold ml-2" style={{ color: item.color }}>{item.match}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Verification */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Certifications & Verification</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map(cert => (
              <div key={cert.id} className="border border-surface-200 rounded-xl p-4">
                <div className="flex items-start justify-between mb-2">
                  <Award size={18} className="text-amber-500" />
                  <span className="badge-success text-[10px]">Active</span>
                </div>
                <h3 className="text-sm font-semibold text-surface-800 mb-1">{cert.name}</h3>
                <p className="text-xs text-surface-500">{cert.provider}</p>
                <p className="text-xs text-surface-400 mt-1">{cert.date}</p>
                {cert.score && <span className={`badge mt-2 ${cert.score === 'Gold' ? 'badge-warning' : 'badge-neutral'}`}>{cert.score}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
