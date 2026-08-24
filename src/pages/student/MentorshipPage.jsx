import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { toast } from '../../components/ui/Toast';
import { MapPin, Star, MessageSquare, Briefcase, Users } from 'lucide-react';

const mentors = [
  { id: 1, name: 'Aditya Kumar', role: 'Senior Software Engineer', company: 'Google', skills: ['System Design', 'React', 'Node.js'], rating: 4.9, mentees: 12, location: 'Bangalore', available: true, match: 94, bio: '8 years at Google. Passionate about mentoring early-career engineers.' },
  { id: 2, name: 'Neha Gupta', role: 'ML Engineering Lead', company: 'Microsoft', skills: ['Machine Learning', 'Python', 'TensorFlow'], rating: 4.8, mentees: 8, location: 'Hyderabad', available: true, match: 78, bio: 'Building AI products at Microsoft. Love guiding students into ML careers.' },
  { id: 3, name: 'Rajesh Nair', role: 'Startup CTO', company: 'FinoTech (YC W24)', skills: ['Full Stack', 'System Design', 'Leadership'], rating: 4.7, mentees: 5, location: 'Mumbai', available: false, match: 85, bio: 'IIT Bombay grad. Built 2 YC-funded startups from 0 to 1.' },
  { id: 4, name: 'Prerna Joshi', role: 'Product Manager', company: 'Swiggy', skills: ['Product Strategy', 'Analytics', 'Communication'], rating: 4.8, mentees: 10, location: 'Bangalore', available: true, match: 60, bio: 'PM at Swiggy. Helping engineers transition to product roles.' },
  { id: 5, name: 'Manish Rao', role: 'DevOps Engineer', company: 'Razorpay', skills: ['Kubernetes', 'AWS', 'DevOps'], rating: 4.6, mentees: 7, location: 'Pune', available: true, match: 72, bio: 'Cloud-native infrastructure at Razorpay. 6+ years in DevOps.' },
  { id: 6, name: 'Shreya Patel', role: 'Frontend Lead', company: 'Figma', skills: ['React', 'TypeScript', 'Design Systems'], rating: 4.9, mentees: 15, location: 'Remote', available: true, match: 88, bio: 'Building Figma\'s UI at scale. Strong believer in accessible design.' },
];

export default function MentorshipPage() {
  return (
    <DashboardLayout>
      <Topbar title="Mentorship" />
      <div className="p-6 animate-fade-in">
        <div className="mb-6">
          <h1 className="page-title">Find a Mentor</h1>
          <p className="text-sm text-surface-500 mt-1">Connect with industry professionals for career guidance</p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {mentors.map(mentor => (
            <div key={mentor.id} className="card card-hover p-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-primary-700">{mentor.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-display font-semibold text-surface-900">{mentor.name}</h3>
                      <p className="text-xs text-surface-500">{mentor.role}</p>
                      <p className="text-xs font-semibold text-primary-600">{mentor.company}</p>
                    </div>
                    <span className={`badge ${mentor.available ? 'badge-success' : 'badge-neutral'} flex-shrink-0`}>
                      {mentor.available ? 'Available' : 'Full'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-surface-600 leading-relaxed">{mentor.bio}</p>

              <div className="flex flex-wrap gap-1">
                {mentor.skills.map(s => <span key={s} className="badge-neutral">{s}</span>)}
              </div>

              <div className="flex items-center gap-3 text-xs text-surface-500">
                <span className="flex items-center gap-1"><Star size={11} className="text-amber-400 fill-amber-400" />{mentor.rating}</span>
                <span className="flex items-center gap-1"><Users size={11} />{mentor.mentees} mentees</span>
                <span className="flex items-center gap-1"><MapPin size={11} />{mentor.location}</span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                <span className="text-xs font-semibold text-emerald-600">{mentor.match}% match</span>
                <button
                  onClick={() => toast.success(mentor.available ? `Request sent to ${mentor.name}!` : 'Added to waitlist!')}
                  className={mentor.available ? 'btn-primary py-1.5 text-xs' : 'btn-secondary py-1.5 text-xs'}
                  disabled={!mentor.available}
                >
                  <MessageSquare size={12} />
                  {mentor.available ? 'Request Mentorship' : 'Join Waitlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
