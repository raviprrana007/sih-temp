import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart2, Target, BookOpen, Briefcase, Users, Award,
  CheckCircle, Star, TrendingUp, Zap, Shield, Globe, ChevronRight, Play,
  Building2, GraduationCap, Brain, Layers, FileText, MessageSquare,
} from 'lucide-react';

const STATS = [
  { value: '10,000+', label: 'Students', color: 'text-primary-600' },
  { value: '500+', label: 'Industry Partners', color: 'text-accent-600' },
  { value: '2,500+', label: 'Opportunities', color: 'text-emerald-600' },
  { value: '85%', label: 'Skill Match Accuracy', color: 'text-purple-600' },
];

const STEPS = [
  { step: '01', title: 'Assess Your Skills', desc: 'Take our industry-designed assessments covering technical and soft skills.', icon: ClipboardList2 },
  { step: '02', title: 'Identify Skill Gaps', desc: 'Get a detailed analysis of where you stand vs. industry benchmarks.', icon: Target },
  { step: '03', title: 'Learn & Improve', desc: 'Access curated courses, workshops, and mentorship to close your gaps.', icon: BookOpen },
  { step: '04', title: 'Find Opportunities', desc: 'Get matched with internships and jobs that fit your skill profile.', icon: Briefcase },
  { step: '05', title: 'Get Hired', desc: 'Track your applications and land your dream role with confidence.', icon: CheckCircle },
];

function ClipboardList2(props) {
  return <BarChart2 {...props} />;
}

const FEATURES = [
  { icon: Brain, title: 'AI Skill Mapping', desc: 'Intelligent matching of your skills to industry requirements and career paths.', color: 'bg-purple-50 text-purple-600' },
  { icon: Target, title: 'Gap Analysis', desc: 'Pinpoint exactly which skills you need to develop for your target role.', color: 'bg-primary-50 text-primary-600' },
  { icon: Briefcase, title: 'Internship Portal', desc: 'Thousands of verified internship opportunities from top companies.', color: 'bg-accent-50 text-accent-600' },
  { icon: Building2, title: 'Placement Hub', desc: 'Entry-level jobs with skill-based matching for fresh graduates.', color: 'bg-emerald-50 text-emerald-600' },
  { icon: BookOpen, title: 'Industry Training', desc: 'Company-published courses and certifications to boost your profile.', color: 'bg-amber-50 text-amber-600' },
  { icon: GraduationCap, title: 'Faculty Programs', desc: 'Dedicated FDP, consultancy, and research opportunities for academicians.', color: 'bg-pink-50 text-pink-600' },
  { icon: Users, title: 'Mentorship', desc: 'Connect with industry professionals for guidance and career insights.', color: 'bg-teal-50 text-teal-600' },
  { icon: Award, title: 'Digital Portfolio', desc: 'Build a verified portfolio showcasing your skills, projects, and achievements.', color: 'bg-orange-50 text-orange-600' },
];

const TESTIMONIALS = [
  { name: 'Ravi Rana', role: 'B.Tech CSE, VIIT Pune', quote: 'SkillBridge helped me identify my skill gaps and land an internship at TechNova with a 92% skill match. The assessment was spot-on.', match: '92% Match' },
  { name: 'Priya Sharma', role: 'IIT Bombay', quote: 'The AI recommendations for ML courses were incredibly accurate. I upskilled in 3 months and got placed at DataSense AI.', match: '94% Match' },
  { name: 'Arjun Mehta', role: 'NIT Warangal', quote: 'As a backend developer aspirant, SkillBridge mapped out exactly what skills I was missing and what to study next. Game changer.', match: '89% Match' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-display font-bold text-sm">S</span>
            </div>
            <div>
              <span className="font-display font-bold text-surface-900">SkillBridge</span>
              <span className="text-[10px] text-surface-400 font-medium ml-1.5 hidden sm:inline">Academia × Industry</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['How It Works', 'For Students', 'For Industry', 'For Academicians', 'About'].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} className="text-sm font-medium text-surface-600 hover:text-surface-900 transition-colors">
                {item}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm font-semibold">Login</Link>
            <Link to="/register" className="btn-primary text-sm">
              Get Started <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-surface-50 to-white pt-20 pb-24" id="home">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent-100 rounded-full opacity-40 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-xs font-semibold text-primary-700 mb-6">
              <Zap size={12} className="text-primary-500" />
              Now with AI-powered skill matching
            </div>

            <h1 className="text-5xl sm:text-6xl font-display font-bold text-surface-900 leading-tight mb-6">
              Bridge the Gap Between{' '}
              <span className="text-primary-600">Education</span> and{' '}
              <span className="text-accent-600">Industry</span>
            </h1>

            <p className="text-lg text-surface-600 leading-relaxed mb-8 max-w-2xl mx-auto">
              Discover the skills you need, build your career profile, connect with industry, and unlock internship and placement opportunities — all in one platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link to="/register" className="btn-primary px-6 py-3 text-base">
                Get Started Free <ArrowRight size={16} />
              </Link>
              <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                Explore Opportunities
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-xs text-surface-500">
              {['Free to join', 'No credit card needed', '10,000+ students trust us'].map((t, i) => (
                <span key={i} className="flex items-center gap-1">
                  <CheckCircle size={12} className="text-emerald-500" /> {t}
                </span>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden border border-surface-200 shadow-card-lg bg-white">
              {/* Browser chrome */}
              <div className="h-9 bg-surface-50 border-b border-surface-200 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 mx-4 bg-white border border-surface-200 rounded-md text-[10px] text-surface-400 px-2 py-1 font-mono">
                  skillbridge.edu.in/student
                </div>
              </div>

              {/* Mini Dashboard Preview */}
              <div className="p-6 bg-surface-50">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { label: 'Career Readiness', value: '78%', color: 'text-primary-600' },
                    { label: 'Skill Score', value: '74/100', color: 'text-accent-600' },
                    { label: 'Applications', value: '6', color: 'text-emerald-600' },
                    { label: 'Interviews', value: '2', color: 'text-purple-600' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white rounded-xl p-3 border border-surface-200">
                      <div className={`text-lg font-display font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-[10px] text-surface-500 font-medium mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-white rounded-xl p-4 border border-surface-200">
                    <div className="text-xs font-semibold text-surface-700 mb-3">Skill Overview</div>
                    <div className="space-y-2">
                      {[
                        { skill: 'JavaScript', score: 85 },
                        { skill: 'React', score: 78 },
                        { skill: 'Node.js', score: 52 },
                        { skill: 'PostgreSQL', score: 68 },
                      ].map(s => (
                        <div key={s.skill} className="flex items-center gap-2">
                          <span className="text-[10px] text-surface-500 w-20 text-right">{s.skill}</span>
                          <div className="flex-1 h-1.5 bg-surface-100 rounded-full overflow-hidden">
                            <div className="h-full bg-primary-500 rounded-full" style={{ width: `${s.score}%` }} />
                          </div>
                          <span className="text-[10px] font-semibold text-surface-700 w-6">{s.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-surface-200">
                    <div className="text-xs font-semibold text-surface-700 mb-3">Top Matches</div>
                    <div className="space-y-2">
                      {[
                        { company: 'TechNova', match: 92, color: '#6366f1' },
                        { company: 'EduPath', match: 88, color: '#f59e0b' },
                        { company: 'FinEdge', match: 85, color: '#10b981' },
                      ].map(c => (
                        <div key={c.company} className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <div className="w-5 h-5 rounded flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: c.color }}>
                              {c.company[0]}
                            </div>
                            <span className="text-[10px] text-surface-600">{c.company}</span>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-600">{c.match}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-y border-surface-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-4xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-surface-500 font-medium mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-3">How It Works</h2>
            <p className="text-surface-600 max-w-lg mx-auto">A clear path from skill assessment to getting hired</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-surface-200" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="relative flex flex-col items-center text-center">
                    <div className="relative w-16 h-16 rounded-2xl bg-white border-2 border-primary-100 flex items-center justify-center mb-4 shadow-card-md z-10">
                      <Icon size={24} className="text-primary-600" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {i + 1}
                      </div>
                    </div>
                    <h3 className="font-display font-semibold text-surface-900 text-sm mb-1">{step.title}</h3>
                    <p className="text-xs text-surface-500 leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="for-students" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-3">Everything You Need</h2>
            <p className="text-surface-600 max-w-lg mx-auto">One platform for the complete academia-industry collaboration lifecycle</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="card card-hover p-5 flex flex-col gap-3">
                  <div className={`w-10 h-10 rounded-xl ${feature.color} flex items-center justify-center`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-surface-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-surface-500 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-surface-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-display font-bold text-surface-900 mb-3">Students Love SkillBridge</h2>
            <p className="text-surface-600">Real results from real students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card p-6 flex flex-col gap-4">
                <div className="flex items-start gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <blockquote className="text-sm text-surface-700 leading-relaxed italic">"{t.quote}"</blockquote>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-surface-100">
                  <div>
                    <div className="text-sm font-semibold text-surface-900">{t.name}</div>
                    <div className="text-xs text-surface-500">{t.role}</div>
                  </div>
                  <span className="badge-success">{t.match}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Industry */}
      <section id="for-industry" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-50 border border-accent-100 text-xs font-semibold text-accent-700 mb-5">
                <Building2 size={12} />
                For Industry Partners
              </div>
              <h2 className="text-3xl font-display font-bold text-surface-900 mb-4">
                Find Exactly the Talent You Need
              </h2>
              <p className="text-surface-600 mb-6 leading-relaxed">
                Post opportunities, discover candidates filtered by skills, and build meaningful relationships with academic institutions. Our skill-matching engine finds candidates that fit — not just those who apply.
              </p>
              <div className="space-y-3">
                {[
                  'Post internships, jobs, and live projects',
                  'AI-powered candidate discovery and skill matching',
                  'Collaborate with faculty on research and workshops',
                  'Access detailed analytics on hiring and skill trends',
                ].map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-surface-700">{point}</span>
                  </div>
                ))}
              </div>
              <Link to="/register" className="btn-primary mt-6 inline-flex">
                Start Recruiting <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Active Roles', value: '12', icon: Briefcase, color: 'text-primary-600', bg: 'bg-primary-50' },
                { label: 'Applications', value: '328', icon: FileText, color: 'text-accent-600', bg: 'bg-accent-50' },
                { label: 'Avg. Skill Match', value: '84%', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Hires This Quarter', value: '23', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="card p-5">
                    <div className={`w-9 h-9 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3`}>
                      <Icon size={18} />
                    </div>
                    <div className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</div>
                    <div className="text-xs text-surface-500 mt-1">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-950">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-4">
            Build Skills. Connect with Industry.<br />Build Your Career.
          </h2>
          <p className="text-primary-200 text-lg mb-8 max-w-lg mx-auto">
            Join 10,000+ students who have already bridged the gap between education and employment.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-all text-base">
              Get Started Free <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="inline-flex items-center gap-2 px-8 py-3.5 border border-primary-700 text-primary-200 font-semibold rounded-xl hover:bg-primary-900 transition-all text-base">
              Login to Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-surface-900 border-t border-surface-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-display font-bold text-xs">S</span>
              </div>
              <span className="font-display font-bold text-white">SkillBridge</span>
              <span className="text-surface-500 text-xs">Academia × Industry</span>
            </div>
            <p className="text-sm text-surface-500">© 2026 SkillBridge. Built for the next generation of talent.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
