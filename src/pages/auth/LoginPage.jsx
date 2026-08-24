import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';

const ROLES = [
  { id: 'student', label: 'Student', desc: 'Find internships & jobs', color: 'border-primary-500 bg-primary-50 text-primary-700' },
  { id: 'industry', label: 'Industry', desc: 'Recruit top talent', color: 'border-accent-500 bg-accent-50 text-accent-700' },
  { id: 'academician', label: 'Academician', desc: 'Industry opportunities', color: 'border-purple-500 bg-purple-50 text-purple-700' },
  { id: 'institution', label: 'Institution', desc: 'Manage & analytics', color: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
];

const ROLE_DESTINATIONS = {
  student: '/student',
  industry: '/industry',
  academician: '/academician',
  institution: '/institution',
};

const DEMO_CREDS = {
  student: 'student@viit.ac.in',
  industry: 'rahul@technova.io',
  academician: 'sunita@viit.ac.in',
  institution: 'admin@viit.ac.in',
};

export default function LoginPage() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const result = login(email, password, role);
    setLoading(false);
    if (result.success) {
      navigate(ROLE_DESTINATIONS[role]);
    } else {
      setError('Invalid credentials. Use demo login below.');
    }
  };

  const demoLogin = () => {
    const result = login(DEMO_CREDS[role], 'demo123', role);
    if (result.success) navigate(ROLE_DESTINATIONS[role]);
  };

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-950 flex-col justify-between p-12">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <span className="text-white font-display font-bold">SkillBridge</span>
          </Link>
        </div>
        <div>
          <blockquote className="text-2xl font-display font-bold text-white leading-relaxed mb-4">
            "SkillBridge helped me close my skill gaps and land my dream internship in 3 months."
          </blockquote>
          <div className="text-primary-300 font-medium">Ravi Rana · B.Tech CSE, VIIT Pune</div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { v: '92%', l: 'Skill Match' },
              { v: '3 months', l: 'To Internship' },
              { v: '6 Apps', l: 'Submitted' },
              { v: '2 Offers', l: 'Received' },
            ].map((s, i) => (
              <div key={i} className="bg-primary-900/50 rounded-xl p-4">
                <div className="text-2xl font-display font-bold text-primary-300">{s.v}</div>
                <div className="text-primary-400 text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-primary-600 text-sm">© 2026 SkillBridge</div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-surface-500 hover:text-surface-700 mb-8 transition-colors">
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <h1 className="text-2xl font-display font-bold text-surface-900 mb-1">Welcome back</h1>
          <p className="text-surface-500 text-sm mb-7">Sign in to your SkillBridge account</p>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            {ROLES.map(r => (
              <button
                key={r.id}
                onClick={() => { setRole(r.id); setEmail(''); setError(''); }}
                className={`p-3 rounded-xl border-2 text-left transition-all ${role === r.id ? r.color : 'border-surface-200 bg-white text-surface-600 hover:border-surface-300'}`}
              >
                <div className="text-sm font-semibold">{r.label}</div>
                <div className="text-xs opacity-70 mt-0.5">{r.desc}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <AlertCircle size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="input"
                placeholder={DEMO_CREDS[role]}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label mb-0">Password</label>
                <button type="button" className="text-xs text-primary-600 hover:text-primary-700 font-medium">Forgot password?</button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base justify-center">
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                <>Sign in <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-surface-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-surface-50 text-xs text-surface-400 font-medium">or</span>
            </div>
          </div>

          <button
            onClick={demoLogin}
            className="btn-secondary w-full py-3 text-base justify-center"
          >
            Demo Login as {ROLES.find(r => r.id === role)?.label}
          </button>

          <p className="text-center text-sm text-surface-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-600 font-semibold hover:text-primary-700">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
