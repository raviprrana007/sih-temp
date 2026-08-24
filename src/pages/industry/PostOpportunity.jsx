import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { toast } from '../../components/ui/Toast';
import { useNavigate } from 'react-router-dom';
import { allSkills } from '../../data/skills';
import { Plus, X, CheckCircle } from 'lucide-react';

const TYPES = ['Job', 'Internship', 'Apprenticeship', 'Live Project', 'Workshop', 'Mentorship'];
const MODES = ['Remote', 'Hybrid', 'On-site'];
const LOCATIONS = ['Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai', 'Delhi', 'Ahmedabad', 'Kolkata', 'Jaipur', 'Other'];

export default function PostOpportunity() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    type: 'Job', title: '', description: '', eligibility: '', location: '', mode: 'Remote',
    duration: '', salary: '', deadline: '', openings: '', skills: [],
    responsibilities: [''],
  });
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const addSkill = (skill) => {
    const s = skill.trim();
    if (s && !form.skills.includes(s)) {
      set('skills', [...form.skills, s]);
      setSkillInput('');
    }
  };

  const removeSkill = (s) => set('skills', form.skills.filter(sk => sk !== s));

  const addResponsibility = () => set('responsibilities', [...form.responsibilities, '']);
  const updateResponsibility = (i, val) => {
    const r = [...form.responsibilities];
    r[i] = val;
    set('responsibilities', r);
  };
  const removeResponsibility = (i) => set('responsibilities', form.responsibilities.filter((_, idx) => idx !== i));

  const validate = () => {
    const errs = {};
    if (!form.title) errs.title = 'Title is required';
    if (!form.description) errs.description = 'Description is required';
    if (!form.location) errs.location = 'Location is required';
    if (!form.deadline) errs.deadline = 'Deadline is required';
    if (!form.openings) errs.openings = 'Number of openings is required';
    if (form.skills.length === 0) errs.skills = 'Add at least one required skill';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await new Promise(r => setTimeout(r, 800));
    setSubmitted(true);
    toast.success('Opportunity posted successfully!');
    setTimeout(() => navigate('/industry'), 2000);
  };

  if (submitted) {
    return (
      <DashboardLayout>
        <Topbar title="Post Opportunity" />
        <div className="p-6 flex items-center justify-center min-h-96">
          <div className="card p-12 text-center max-w-sm animate-slide-up">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-display font-bold text-surface-900 mb-2">Opportunity Posted!</h2>
            <p className="text-sm text-surface-500">Your {form.type.toLowerCase()} has been published. You'll start receiving applications shortly.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Topbar title="Post Opportunity" />
      <div className="p-6 max-w-3xl mx-auto animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type selector */}
          <div className="card p-5">
            <h2 className="section-title mb-4">Opportunity Type</h2>
            <div className="flex flex-wrap gap-2">
              {TYPES.map(t => (
                <button
                  key={t} type="button"
                  onClick={() => set('type', t)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 transition-all ${form.type === t ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300'}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="card p-5 space-y-4">
            <h2 className="section-title">Basic Information</h2>
            <div>
              <label className="label">Title / Role *</label>
              <input className={errors.title ? 'input-error' : 'input'} value={form.title} onChange={e => set('title', e.target.value)} placeholder={`e.g., Senior ${form.type === 'Job' ? 'Software Engineer' : form.type === 'Internship' ? 'Frontend Developer Intern' : form.type}`} />
              {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
            </div>
            <div>
              <label className="label">Description *</label>
              <textarea className={`${errors.description ? 'input-error' : 'input'} min-h-[100px] resize-none`} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Describe the role, what the candidate will work on, and the team they'll join..." />
              {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
            </div>
            <div>
              <label className="label">Eligibility</label>
              <input className="input" value={form.eligibility} onChange={e => set('eligibility', e.target.value)} placeholder="e.g., B.Tech/B.E. in CS/IT, 2026 batch, CGPA ≥ 7.5" />
            </div>
          </div>

          {/* Responsibilities */}
          <div className="card p-5 space-y-4">
            <h2 className="section-title">Key Responsibilities</h2>
            {form.responsibilities.map((r, i) => (
              <div key={i} className="flex items-center gap-2">
                <input className="input flex-1" value={r} onChange={e => updateResponsibility(i, e.target.value)} placeholder={`Responsibility ${i + 1}`} />
                {form.responsibilities.length > 1 && (
                  <button type="button" onClick={() => removeResponsibility(i)} className="text-surface-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addResponsibility} className="btn-ghost text-xs">
              <Plus size={13} /> Add Responsibility
            </button>
          </div>

          {/* Required Skills */}
          <div className="card p-5 space-y-4">
            <h2 className="section-title">Required Skills *</h2>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  className="input"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill(skillInput))}
                  placeholder="Type a skill and press Enter"
                  list="skill-suggestions"
                />
                <datalist id="skill-suggestions">
                  {allSkills.filter(s => s.toLowerCase().includes(skillInput.toLowerCase()) && !form.skills.includes(s)).slice(0, 8).map(s => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </div>
              <button type="button" onClick={() => addSkill(skillInput)} className="btn-secondary">Add</button>
            </div>
            {errors.skills && <p className="text-xs text-red-500">{errors.skills}</p>}
            <div className="flex flex-wrap gap-2">
              {form.skills.map(s => (
                <span key={s} className="inline-flex items-center gap-1 badge-primary px-3 py-1">
                  {s}
                  <button type="button" onClick={() => removeSkill(s)} className="hover:text-red-500"><X size={11} /></button>
                </span>
              ))}
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-2">Quick add:</p>
              <div className="flex flex-wrap gap-1.5">
                {['React', 'Node.js', 'Python', 'Java', 'AWS', 'PostgreSQL', 'TypeScript', 'Docker'].filter(s => !form.skills.includes(s)).map(s => (
                  <button key={s} type="button" onClick={() => addSkill(s)} className="text-xs px-2 py-1 bg-surface-100 hover:bg-primary-50 hover:text-primary-700 rounded-md text-surface-600 transition-colors">
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="card p-5">
            <h2 className="section-title mb-4">Opportunity Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Location *</label>
                <select className={errors.location ? 'input-error' : 'input'} value={form.location} onChange={e => set('location', e.target.value)}>
                  <option value="">Select city</option>
                  {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                </select>
                {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
              </div>
              <div>
                <label className="label">Work Mode</label>
                <select className="input" value={form.mode} onChange={e => set('mode', e.target.value)}>
                  {MODES.map(m => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label className="label">{form.type === 'Job' ? 'Salary/CTC' : 'Stipend'}</label>
                <input className="input" value={form.salary} onChange={e => set('salary', e.target.value)} placeholder={form.type === 'Job' ? '₹8–12 LPA' : '₹20,000/month'} />
              </div>
              <div>
                <label className="label">Duration</label>
                <input className="input" value={form.duration} onChange={e => set('duration', e.target.value)} placeholder={form.type === 'Internship' ? '3–6 months' : 'Permanent'} />
              </div>
              <div>
                <label className="label">Application Deadline *</label>
                <input type="date" className={errors.deadline ? 'input-error' : 'input'} value={form.deadline} onChange={e => set('deadline', e.target.value)} />
                {errors.deadline && <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>}
              </div>
              <div>
                <label className="label">Number of Openings *</label>
                <input type="number" min="1" className={errors.openings ? 'input-error' : 'input'} value={form.openings} onChange={e => set('openings', e.target.value)} placeholder="e.g., 3" />
                {errors.openings && <p className="text-xs text-red-500 mt-1">{errors.openings}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pb-6">
            <button type="button" onClick={() => navigate('/industry')} className="btn-secondary flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1 py-3 text-base justify-center">
              Publish Opportunity
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
