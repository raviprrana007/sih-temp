import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { currentStudent, projects, achievements, applications } from '../../data/students';
import { certifications } from '../../data/courses';
import { technicalSkills } from '../../data/skills';
import { Share2, Download, GitBranch, ExternalLink, MapPin, Mail, Link, Trophy, Edit3, Plus, CheckCircle } from 'lucide-react';
import Modal from '../../components/ui/Modal';

export default function DigitalPortfolio() {
  const [shareModal, setShareModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const portfolioUrl = 'skillbridge.edu.in/portfolio/ravi-rana';

  const handleCopy = () => {
    navigator.clipboard.writeText(portfolioUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const internships = applications.filter(a => a.type === 'internship' && a.status === 'selected');

  return (
    <DashboardLayout>
      <Topbar title="Digital Portfolio" />
      <div className="p-6 animate-fade-in space-y-6">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">My Portfolio</h1>
            <p className="text-sm text-surface-500 mt-0.5">Your verified professional profile</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setShareModal(true)} className="btn-secondary">
              <Share2 size={15} /> Share Portfolio
            </button>
            <button className="btn-primary">
              <Download size={15} /> Download Resume
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="card p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-primary-100 flex items-center justify-center">
                <span className="text-3xl font-display font-bold text-primary-700">
                  {currentStudent.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-surface-900">{currentStudent.name}</h2>
                <p className="text-surface-500 text-sm mt-0.5">{currentStudent.degree} in {currentStudent.branch}</p>
                <p className="text-surface-500 text-sm">{currentStudent.institution}</p>
                <p className="text-primary-600 text-sm font-semibold mt-1">🎯 {currentStudent.careerGoal}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-surface-500">
                  <span className="flex items-center gap-1"><MapPin size={11} />{currentStudent.location}</span>
                  <span className="flex items-center gap-1"><Mail size={11} />{currentStudent.email}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setEditModal(true)} className="btn-ghost">
              <Edit3 size={15} /> Edit Profile
            </button>
          </div>
          <p className="text-sm text-surface-600 mt-4 leading-relaxed">{currentStudent.bio}</p>
          <div className="flex items-center gap-3 mt-4">
            <a href="#" className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:text-primary-700">
              <Link size={14} /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-1.5 text-xs font-semibold text-surface-600 hover:text-surface-800">
              <GitBranch size={14} /> GitHub
            </a>
          </div>
        </div>

        {/* Verified Skills */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Verified Skills</h2>
            <button className="btn-ghost text-xs"><Plus size={14} /> Add Skill</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {technicalSkills.map(skill => (
              <span key={skill.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${skill.verified ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-surface-100 border-surface-200 text-surface-600'}`}>
                {skill.verified && <CheckCircle size={11} className="text-primary-500" />}
                {skill.name}
                <span className="text-[10px] opacity-70">{skill.score}%</span>
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Projects</h2>
            <button className="btn-ghost text-xs"><Plus size={14} /> Add Project</button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map(project => (
              <div key={project.id} className={`p-4 rounded-xl border ${project.featured ? 'border-primary-200 bg-primary-50/30' : 'border-surface-200'}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-display font-semibold text-surface-900">{project.name}</h3>
                    {project.featured && <span className="badge-primary text-[10px]">Featured</span>}
                  </div>
                  <span className={`badge ${project.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                    {project.status === 'completed' ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <p className="text-xs text-surface-600 leading-relaxed mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.tech.map(t => <span key={t} className="badge-neutral">{t}</span>)}
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="flex items-center gap-1 text-xs font-semibold text-surface-600 hover:text-surface-900">
                    <GitBranch size={12} /> GitHub
                  </a>
                  {project.demo && (
                    <a href="#" className="flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700">
                      <ExternalLink size={12} /> Live Demo
                    </a>
                  )}
                  <span className="ml-auto text-xs text-surface-400">⭐ {project.stars}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Certifications</h2>
            <button className="btn-ghost text-xs"><Plus size={14} /> Add</button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {certifications.map(cert => (
              <div key={cert.id} className="p-3 border border-surface-200 rounded-xl flex items-center gap-3">
                <div className="w-9 h-9 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-600">{cert.provider[0]}</span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-surface-800 truncate">{cert.name}</p>
                  <p className="text-[10px] text-surface-500">{cert.provider} · {cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Achievements & Recognition</h2>
            <button className="btn-ghost text-xs"><Plus size={14} /> Add</button>
          </div>
          <div className="space-y-3">
            {achievements.map(ach => (
              <div key={ach.id} className="flex items-start gap-3 p-3 bg-surface-50 rounded-xl">
                <div className="w-9 h-9 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy size={16} className="text-amber-600" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-surface-800">{ach.title}</h3>
                  <p className="text-xs text-surface-500 mt-0.5">{ach.date}</p>
                  <p className="text-xs text-surface-600 mt-1 leading-relaxed">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <Modal open={shareModal} onClose={() => setShareModal(false)} title="Share Portfolio" size="sm">
        <div className="space-y-4">
          <p className="text-sm text-surface-600">Share your verified SkillBridge portfolio with recruiters and institutions.</p>
          <div className="flex items-center gap-2 p-3 bg-surface-50 rounded-xl border border-surface-200">
            <span className="text-sm text-surface-700 font-mono flex-1 truncate">{portfolioUrl}</span>
            <button onClick={handleCopy} className={`btn-primary py-1.5 text-xs flex-shrink-0 ${copied ? 'bg-emerald-600 hover:bg-emerald-600' : ''}`}>
              {copied ? <><CheckCircle size={13} /> Copied!</> : 'Copy Link'}
            </button>
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary flex-1 text-xs py-2">
              <Link size={14} /> Share on LinkedIn
            </button>
            <button className="btn-secondary flex-1 text-xs py-2">
              <Mail size={14} /> Send via Email
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal open={editModal} onClose={() => setEditModal(false)} title="Edit Profile" size="md">
        <div className="space-y-4">
          <div>
            <label className="label">Bio</label>
            <textarea className="input min-h-[80px]" defaultValue={currentStudent.bio} />
          </div>
          <div>
            <label className="label">Career Goal</label>
            <input className="input" defaultValue={currentStudent.careerGoal} />
          </div>
          <div>
            <label className="label">LinkedIn URL</label>
            <input className="input" defaultValue={currentStudent.linkedin} />
          </div>
          <div>
            <label className="label">GitHub URL</label>
            <input className="input" defaultValue={currentStudent.github} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={() => setEditModal(false)} className="btn-secondary flex-1">Cancel</button>
            <button onClick={() => setEditModal(false)} className="btn-primary flex-1">Save Changes</button>
          </div>
        </div>
      </Modal>
    </DashboardLayout>
  );
}
