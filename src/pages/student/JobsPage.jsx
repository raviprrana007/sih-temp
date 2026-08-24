import { useState, useMemo } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import OpportunityCard from '../../components/cards/OpportunityCard';
import SearchBar from '../../components/ui/SearchBar';
import Modal from '../../components/ui/Modal';
import { jobs } from '../../data/jobs';
import { useApp } from '../../context/AppContext';
import { toast } from '../../components/ui/Toast';
import { Filter, MapPin, Clock, Banknote, CheckCircle, X, Briefcase, Building2 } from 'lucide-react';

const MODES = ['All', 'Remote', 'Hybrid', 'On-site'];
const SALARIES = ['All', '₹6-8 LPA', '₹8-12 LPA', '₹12+ LPA'];
const LOCATIONS = ['All', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai', 'Delhi'];

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('All');
  const [location, setLocation] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [selected, setSelected] = useState(null);
  const { applyToOpportunity } = useApp();

  const filtered = useMemo(() => {
    let list = jobs.filter(j => {
      const matchSearch = !search || j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()) || j.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchMode = mode === 'All' || j.mode === mode;
      const matchLoc = location === 'All' || j.location === location;
      return matchSearch && matchMode && matchLoc;
    });
    if (sortBy === 'match') list.sort((a, b) => b.match - a.match);
    return list;
  }, [search, mode, location, sortBy]);

  const handleApply = (opp) => {
    const result = applyToOpportunity({ ...opp, type: 'job' });
    toast[result.success ? 'success' : 'warning'](result.message);
    setSelected(null);
  };

  return (
    <DashboardLayout>
      <Topbar title="Job Opportunities" />
      <div className="p-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchBar value={search} onChange={setSearch} placeholder="Search by role, company, or skill..." className="flex-1" />
          <select className="input w-auto min-w-[140px]" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="match">Best Match</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-5">
          <Filter size={14} className="text-surface-400 self-center" />
          {[
            { label: 'Mode', value: mode, options: MODES, setter: setMode },
            { label: 'Location', value: location, options: LOCATIONS, setter: setLocation },
          ].map(({ label, value, options, setter }) => (
            <select key={label} value={value} onChange={e => setter(e.target.value)} className="text-xs border border-surface-200 rounded-lg px-2.5 py-1.5 bg-white text-surface-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500">
              {options.map(opt => <option key={opt} value={opt}>{opt === 'All' ? label + ': All' : opt}</option>)}
            </select>
          ))}
          {(mode !== 'All' || location !== 'All' || search) && (
            <button onClick={() => { setMode('All'); setLocation('All'); setSearch(''); }} className="text-xs text-red-600 font-semibold flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-red-50">
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <p className="text-sm text-surface-500 mb-4 font-medium">{filtered.length} jobs found</p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(job => (
            <OpportunityCard key={job.id} opportunity={job} type="job" onClick={() => setSelected(job)} onApply={handleApply} />
          ))}
        </div>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-surface-600 font-medium">{selected.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-surface-500">
                  <span className="flex items-center gap-1"><MapPin size={13} />{selected.location}</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{selected.experience}</span>
                  <span className="flex items-center gap-1"><Banknote size={13} />{selected.salary}</span>
                  <span className={`badge ${selected.mode === 'Remote' ? 'badge-success' : 'badge-info'}`}>{selected.mode}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{selected.match}%</div>
                <div className="text-xs text-surface-500">Match</div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">About the Role</h3>
              <p className="text-sm text-surface-600 leading-relaxed">{selected.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Responsibilities</h3>
              <ul className="space-y-1.5">
                {selected.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-surface-600">
                    <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />{r}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Required Skills</h3>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map(s => <span key={s} className="badge-primary">{s}</span>)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Perks & Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {selected.perks.map(p => <span key={p} className="badge-success">{p}</span>)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Selection Process</h3>
              <div className="flex items-center gap-2 flex-wrap">
                {selected.selectionProcess.map((step, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 bg-surface-100 rounded-md font-medium text-surface-600">{step}</span>
                    {i < selected.selectionProcess.length - 1 && <span className="text-surface-300">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-2 border-t border-surface-100">
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleApply(selected)} className="btn-primary flex-1">Apply Now</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
