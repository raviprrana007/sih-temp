import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { currentStudent } from '../../data/students';
import { technicalSkills } from '../../data/skills';
import { toast } from '../../components/ui/Toast';
import { Edit3, MapPin, Mail, Phone, GitBranch, Link, Save, X } from 'lucide-react';
import ProgressBar from '../../components/ui/ProgressBar';

export default function StudentProfile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...currentStudent });

  const handleSave = () => {
    setEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout>
      <Topbar title="My Profile" />
      <div className="p-6 max-w-4xl mx-auto space-y-5 animate-fade-in">
        {/* Profile Card */}
        <div className="card p-6">
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-primary-700">
                  {currentStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                {editing ? (
                  <input className="input text-xl font-display font-bold mb-1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                ) : (
                  <h2 className="text-xl font-display font-bold text-surface-900">{form.name}</h2>
                )}
                <p className="text-surface-500 text-sm">{form.degree} · {form.branch}</p>
                <p className="text-surface-500 text-sm">{form.institution}</p>
              </div>
            </div>
            <button onClick={() => editing ? handleSave() : setEditing(true)} className={editing ? 'btn-primary' : 'btn-secondary'}>
              {editing ? <><Save size={14} /> Save</> : <><Edit3 size={14} /> Edit Profile</>}
            </button>
          </div>

          {editing && (
            <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-surface-50 rounded-xl">
              <div>
                <label className="label">Career Goal</label>
                <input className="input" value={form.careerGoal} onChange={e => setForm(f => ({ ...f, careerGoal: e.target.value }))} />
              </div>
              <div>
                <label className="label">Location</label>
                <input className="input" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="col-span-2">
                <label className="label">Bio</label>
                <textarea className="input min-h-[80px]" value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} />
              </div>
              <div>
                <label className="label">GitHub</label>
                <input className="input" value={form.github} onChange={e => setForm(f => ({ ...f, github: e.target.value }))} />
              </div>
              <div>
                <label className="label">LinkedIn</label>
                <input className="input" value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} />
              </div>
            </div>
          )}

          {!editing && (
            <>
              <p className="text-sm text-surface-600 mb-4">{form.bio}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-surface-500">
                <span className="flex items-center gap-1"><MapPin size={12} />{form.location}</span>
                <span className="flex items-center gap-1"><Mail size={12} />{form.email}</span>
                <span className="flex items-center gap-1"><Phone size={12} />{form.phone}</span>
                <a href="#" className="flex items-center gap-1 text-primary-600"><GitBranch size={12} />{form.github}</a>
                <a href="#" className="flex items-center gap-1 text-primary-600"><Link size={12} />{form.linkedin}</a>
              </div>
            </>
          )}
        </div>

        {/* Academic Info */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="card p-5">
            <h2 className="section-title mb-4">Academic Information</h2>
            <div className="space-y-3">
              {[
                { label: 'Degree', value: form.degree },
                { label: 'Branch', value: form.branch },
                { label: 'Institution', value: form.institution },
                { label: 'Graduation Year', value: form.graduationYear },
                { label: 'CGPA', value: form.cgpa },
                { label: 'Career Goal', value: form.careerGoal },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-surface-50">
                  <span className="text-xs text-surface-500 font-medium">{label}</span>
                  <span className="text-sm font-semibold text-surface-800">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h2 className="section-title mb-4">Readiness Scores</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-surface-600">Career Readiness</span>
                  <span className="text-sm font-bold text-primary-600">78%</span>
                </div>
                <ProgressBar value={78} color="primary" height="md" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-surface-600">Skill Score</span>
                  <span className="text-sm font-bold text-accent-600">74/100</span>
                </div>
                <ProgressBar value={74} color="info" height="md" />
              </div>
              <div>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm text-surface-600">Profile Completion</span>
                  <span className="text-sm font-bold text-emerald-600">85%</span>
                </div>
                <ProgressBar value={85} color="success" height="md" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Skills */}
        <div className="card p-5">
          <h2 className="section-title mb-4">Top Skills</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {technicalSkills.slice(0, 6).map(skill => (
              <div key={skill.name} className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl">
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-semibold text-surface-700">{skill.name}</span>
                    <span className="text-xs font-bold text-surface-600">{skill.score}%</span>
                  </div>
                  <ProgressBar value={skill.score} color={skill.score >= 80 ? 'success' : skill.score >= 60 ? 'primary' : 'warning'} height="sm" />
                </div>
                {skill.verified && <span className="badge-success text-[10px] flex-shrink-0">✓</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
