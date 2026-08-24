import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, ArrowRight, CheckCircle, User, Building2, GraduationCap, Building } from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student', desc: 'Find skill development and opportunities', icon: User, color: 'border-primary-500 bg-primary-50' },
  { id: 'industry', label: 'Industry', desc: 'Post opportunities and recruit talent', icon: Building2, color: 'border-accent-500 bg-accent-50' },
  { id: 'academician', label: 'Academician', desc: 'Explore industry programs', icon: GraduationCap, color: 'border-purple-500 bg-purple-50' },
  { id: 'institution', label: 'Institution', desc: 'Manage students and analytics', icon: Building, color: 'border-emerald-500 bg-emerald-50' },
];

const DEGREE_OPTIONS = ['B.Tech', 'B.E.', 'B.Sc', 'B.Com', 'BCA', 'M.Tech', 'M.Sc', 'MBA', 'MCA', 'Ph.D'];
const BRANCH_OPTIONS = ['Computer Science', 'Information Technology', 'Electronics & Communication', 'Mechanical', 'Civil', 'Chemical', 'Electrical', 'Data Science'];
const INDUSTRY_OPTIONS = ['Software/IT', 'AI/ML', 'FinTech', 'HealthTech', 'EdTech', 'E-Commerce', 'Consulting', 'Manufacturing', 'Banking/Finance', 'Other'];

const ROLE_DESTINATIONS = {
  student: '/student',
  industry: '/industry',
  academician: '/academician',
  institution: '/institution',
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const set = (key, val) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: '' }));
  };

  const validateStep2 = () => {
    const errs = {};
    if (role === 'student') {
      if (!form.name) errs.name = 'Name is required';
      if (!form.email) errs.email = 'Email is required';
      if (!form.institution) errs.institution = 'Institution is required';
      if (!form.degree) errs.degree = 'Degree is required';
    } else if (role === 'industry') {
      if (!form.companyName) errs.companyName = 'Company name is required';
      if (!form.email) errs.email = 'Email is required';
    } else {
      if (!form.name) errs.name = 'Name is required';
      if (!form.email) errs.email = 'Email is required';
    }
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email format';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const result = register(form, role);
    setLoading(false);
    if (result.success) navigate(ROLE_DESTINATIONS[role]);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center p-8">
        <div className="w-full max-w-lg">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-8 transition-colors">
            <ArrowLeft size={14} />Back to home
          </Link>
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-display font-bold text-lg">S</span>
            </div>
            <h1 className="text-2xl font-display font-bold text-surface-900 mb-2">Join SkillBridge</h1>
            <p className="text-surface-500 text-sm">Select your role to get started</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLES.map(r => {
              const Icon = r.icon;
              return (
                <button
                  key={r.id}
                  onClick={() => { setRole(r.id); setStep(2); }}
                  className={`p-5 rounded-xl border-2 text-left transition-all hover:shadow-card-md ${r.color} hover:scale-[1.02]`}
                >
                  <Icon size={24} className="mb-3 text-surface-600" />
                  <div className="font-display font-semibold text-surface-900 mb-1">{r.label}</div>
                  <div className="text-sm text-surface-500">{r.desc}</div>
                  <div className="mt-3 flex items-center text-xs font-semibold text-primary-600">
                    Continue <ArrowRight size={12} className="ml-1" />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-center text-sm text-surface-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <button onClick={() => setStep(1)} className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-8 transition-colors">
          <ArrowLeft size={14} />Choose different role
        </button>

        <div className="card p-6">
          <div className="mb-6">
            <span className={`badge mb-3 ${role === 'student' ? 'badge-primary' : role === 'industry' ? 'badge-info' : role === 'academician' ? 'badge-purple' : 'badge-success'}`}>
              {ROLES.find(r => r.id === role)?.label}
            </span>
            <h1 className="text-xl font-display font-bold text-surface-900">Create your account</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student fields */}
            {role === 'student' && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="label">Full Name *</label>
                    <input className={errors.name ? 'input-error' : 'input'} value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="Ravi Prakash Rana" />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="label">Email *</label>
                    <input type="email" className={errors.email ? 'input-error' : 'input'} value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="you@college.ac.in" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input className="input" value={form.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+91 9876543210" />
                  </div>
                  <div className="col-span-2">
                    <label className="label">Institution *</label>
                    <input className={errors.institution ? 'input-error' : 'input'} value={form.institution || ''} onChange={e => set('institution', e.target.value)} placeholder="VIIT Pune" />
                    {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
                  </div>
                  <div>
                    <label className="label">Degree *</label>
                    <select className={errors.degree ? 'input-error' : 'input'} value={form.degree || ''} onChange={e => set('degree', e.target.value)}>
                      <option value="">Select</option>
                      {DEGREE_OPTIONS.map(d => <option key={d}>{d}</option>)}
                    </select>
                    {errors.degree && <p className="text-xs text-red-500 mt-1">{errors.degree}</p>}
                  </div>
                  <div>
                    <label className="label">Branch</label>
                    <select className="input" value={form.branch || ''} onChange={e => set('branch', e.target.value)}>
                      <option value="">Select</option>
                      {BRANCH_OPTIONS.map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Graduation Year</label>
                    <select className="input" value={form.graduationYear || ''} onChange={e => set('graduationYear', e.target.value)}>
                      <option value="">Select</option>
                      {[2025, 2026, 2027, 2028].map(y => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Career Goal</label>
                    <input className="input" value={form.careerGoal || ''} onChange={e => set('careerGoal', e.target.value)} placeholder="Full Stack Developer" />
                  </div>
                </div>
              </>
            )}

            {/* Industry fields */}
            {role === 'industry' && (
              <>
                <div>
                  <label className="label">Company Name *</label>
                  <input className={errors.companyName ? 'input-error' : 'input'} value={form.companyName || ''} onChange={e => set('companyName', e.target.value)} placeholder="TechNova Solutions" />
                  {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="label">Company Email *</label>
                  <input type="email" className={errors.email ? 'input-error' : 'input'} value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="hr@company.com" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Industry</label>
                    <select className="input" value={form.industry || ''} onChange={e => set('industry', e.target.value)}>
                      <option value="">Select</option>
                      {INDUSTRY_OPTIONS.map(i => <option key={i}>{i}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Company Size</label>
                    <select className="input" value={form.companySize || ''} onChange={e => set('companySize', e.target.value)}>
                      <option value="">Select</option>
                      {['1-50', '50-200', '200-500', '500-1000', '1000+'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="label">Website</label>
                  <input className="input" value={form.website || ''} onChange={e => set('website', e.target.value)} placeholder="https://company.com" />
                </div>
              </>
            )}

            {/* Academician fields */}
            {role === 'academician' && (
              <>
                <div>
                  <label className="label">Full Name *</label>
                  <input className={errors.name ? 'input-error' : 'input'} value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="Dr. Sunita Kulkarni" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Institution *</label>
                  <input className={errors.institution ? 'input-error' : 'input'} value={form.institution || ''} onChange={e => set('institution', e.target.value)} placeholder="VIIT Pune" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="label">Department</label>
                    <input className="input" value={form.department || ''} onChange={e => set('department', e.target.value)} placeholder="CS & Engineering" />
                  </div>
                  <div>
                    <label className="label">Designation</label>
                    <input className="input" value={form.designation || ''} onChange={e => set('designation', e.target.value)} placeholder="Associate Professor" />
                  </div>
                </div>
                <div>
                  <label className="label">Email *</label>
                  <input type="email" className={errors.email ? 'input-error' : 'input'} value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="faculty@college.ac.in" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
              </>
            )}

            {/* Institution fields */}
            {role === 'institution' && (
              <>
                <div>
                  <label className="label">Institution Name *</label>
                  <input className={errors.name ? 'input-error' : 'input'} value={form.name || ''} onChange={e => set('name', e.target.value)} placeholder="VIIT Pune" />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="label">Admin Email *</label>
                  <input type="email" className={errors.email ? 'input-error' : 'input'} value={form.email || ''} onChange={e => set('email', e.target.value)} placeholder="admin@college.ac.in" />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="label">Location</label>
                  <input className="input" value={form.location || ''} onChange={e => set('location', e.target.value)} placeholder="Pune, Maharashtra" />
                </div>
              </>
            )}

            {/* Password */}
            <div>
              <label className="label">Password *</label>
              <input type="password" className={errors.password ? 'input-error' : 'input'} value={form.password || ''} onChange={e => set('password', e.target.value)} placeholder="Min. 6 characters" />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base justify-center mt-2">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-surface-500 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
