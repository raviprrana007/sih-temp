import { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import CandidateCard from '../../components/cards/CandidateCard';
import SearchBar from '../../components/ui/SearchBar';
import Modal from '../../components/ui/Modal';
import { candidates } from '../../data/analytics';
import { toast } from '../../components/ui/Toast';
import { Filter, GraduationCap, MapPin, Star, CheckCircle, X, GitBranch, Link, Mail } from 'lucide-react';
import ProgressBar from '../../components/ui/ProgressBar';

const SKILLS = ['All', 'React', 'Python', 'Java', 'Node.js', 'Go', 'AWS', 'Machine Learning', 'Docker'];
const LOCATIONS = ['All', 'Pune', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Delhi'];
const AVAILABILITY = ['All', 'Immediate', 'June 2026', 'July 2026'];

export default function CandidateDiscovery() {
  const [search, setSearch] = useState('');
  const [skill, setSkill] = useState('All');
  const [location, setLocation] = useState('All');
  const [availability, setAvailability] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [selected, setSelected] = useState(null);
  const [shortlisted, setShortlisted] = useState(new Set());

  const filtered = useMemo(() => {
    let list = candidates.filter(c => {
      const matchSearch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.careerGoal.toLowerCase().includes(search.toLowerCase()) || c.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchSkill = skill === 'All' || c.skills.some(s => s.includes(skill));
      const matchLoc = location === 'All' || c.location === location;
      const matchAvail = availability === 'All' || c.availability === availability;
      return matchSearch && matchSkill && matchLoc && matchAvail;
    });
    if (sortBy === 'match') list.sort((a, b) => b.match - a.match);
    else if (sortBy === 'skill') list.sort((a, b) => b.skillScore - a.skillScore);
    else if (sortBy === 'cgpa') list.sort((a, b) => b.cgpa - a.cgpa);
    return list;
  }, [search, skill, location, availability, sortBy]);

  const handleShortlist = (c) => {
    setShortlisted(prev => {
      const n = new Set(prev);
      if (n.has(c.id)) { n.delete(c.id); toast.warning(`${c.name} removed from shortlist`); }
      else { n.add(c.id); toast.success(`${c.name} added to shortlist!`); }
      return n;
    });
  };

  const handleContact = (c) => toast.success(`Invitation sent to ${c.name}!`);

  return (
    <DashboardLayout>
      <Topbar title="Candidate Discovery" />
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name, skill, or goal..." className="flex-1" />
          <select className="input w-auto min-w-[140px]" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="match">Best Match</option>
            <option value="skill">Skill Score</option>
            <option value="cgpa">CGPA</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Filter size={14} className="text-surface-400 self-center" />
          {[
            { label: 'Skill', value: skill, options: SKILLS, setter: setSkill },
            { label: 'Location', value: location, options: LOCATIONS, setter: setLocation },
            { label: 'Availability', value: availability, options: AVAILABILITY, setter: setAvailability },
          ].map(({ label, value, options, setter }) => (
            <select key={label} value={value} onChange={e => setter(e.target.value)} className="text-xs border border-surface-200 rounded-lg px-2.5 py-1.5 bg-white text-surface-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
              {options.map(opt => <option key={opt}>{opt === 'All' ? label + ': All' : opt}</option>)}
            </select>
          ))}
          {shortlisted.size > 0 && (
            <span className="badge-primary ml-2">{shortlisted.size} Shortlisted</span>
          )}
        </div>

        <p className="text-sm text-surface-500 mb-4 font-medium">{filtered.length} candidates found</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {filtered.map(c => (
            <div key={c.id} className="relative">
              {shortlisted.has(c.id) && (
                <div className="absolute -top-1 -right-1 z-10 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
              <CandidateCard candidate={c} onClick={() => setSelected(c)} onShortlist={handleShortlist} onContact={handleContact} />
            </div>
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Candidate Profile" size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl font-bold text-primary-700">{selected.name[0]}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-display font-bold text-surface-900">{selected.name}</h2>
                <p className="text-surface-600">{selected.careerGoal}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs text-surface-500">
                  <span className="flex items-center gap-1"><GraduationCap size={12} />{selected.institution}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{selected.location}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-emerald-600">{selected.match}%</div>
                <div className="text-xs text-surface-500">Match Score</div>
              </div>
            </div>

            <p className="text-sm text-surface-600 leading-relaxed p-4 bg-surface-50 rounded-xl">{selected.bio}</p>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Skill Score', value: `${selected.skillScore}/100`, color: 'text-primary-600' },
                { label: 'CGPA', value: selected.cgpa, color: 'text-accent-600' },
                { label: 'Batch', value: selected.batch, color: 'text-purple-600' },
              ].map(({ label, value, color }) => (
                <div key={label} className="bg-surface-50 rounded-xl p-3 text-center">
                  <div className={`text-xl font-display font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-surface-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selected.skills.map(s => <span key={s} className="badge-primary">{s}</span>)}
              </div>
            </div>

            <div>
              <p className="text-xs text-surface-500 mb-1">Availability: <span className="font-semibold text-surface-700">{selected.availability}</span></p>
            </div>

            <div className="flex gap-3 pt-2 border-t border-surface-100">
              <button onClick={() => { handleShortlist(selected); setSelected(null); }} className={`btn-secondary flex-1 ${shortlisted.has(selected.id) ? 'border-primary-300 text-primary-700' : ''}`}>
                {shortlisted.has(selected.id) ? 'Remove Shortlist' : 'Shortlist'}
              </button>
              <button onClick={() => { handleContact(selected); setSelected(null); }} className="btn-primary flex-1">
                <Mail size={14} /> Send Invitation
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
