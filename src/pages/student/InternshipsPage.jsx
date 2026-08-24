import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import OpportunityCard from '../../components/cards/OpportunityCard';
import SearchBar from '../../components/ui/SearchBar';
import Modal from '../../components/ui/Modal';
import { internships } from '../../data/internships';
import { useApp } from '../../context/AppContext';
import { toast } from '../../components/ui/Toast';
import { Filter, SlidersHorizontal, MapPin, Clock, Banknote, CheckCircle, X, Briefcase } from 'lucide-react';

const MODES = ['All', 'Remote', 'Hybrid', 'On-site'];
const DURATIONS = ['All', '3 months', '4 months', '6 months'];
const LOCATIONS = ['All', 'Bangalore', 'Pune', 'Hyderabad', 'Mumbai', 'Chennai', 'Delhi'];
const MATCH_OPTIONS = ['All', '80%+', '70%+', '50%+'];

export default function InternshipsPage() {
  const [search, setSearch] = useState('');
  const [mode, setMode] = useState('All');
  const [duration, setDuration] = useState('All');
  const [location, setLocation] = useState('All');
  const [minMatch, setMinMatch] = useState('All');
  const [sortBy, setSortBy] = useState('match');
  const [selected, setSelected] = useState(null);
  const { applyToOpportunity } = useApp();

  const filtered = useMemo(() => {
    let list = internships.filter(i => {
      const matchSearch = !search || i.title.toLowerCase().includes(search.toLowerCase()) || i.company.toLowerCase().includes(search.toLowerCase()) || i.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
      const matchMode = mode === 'All' || i.mode === mode;
      const matchDur = duration === 'All' || i.duration === duration;
      const matchLoc = location === 'All' || i.location === location;
      const matchMatch = minMatch === 'All' || i.match >= parseInt(minMatch);
      return matchSearch && matchMode && matchDur && matchLoc && matchMatch;
    });
    if (sortBy === 'match') list.sort((a, b) => b.match - a.match);
    else if (sortBy === 'recent') list.sort((a, b) => (a.id > b.id ? -1 : 1));
    else if (sortBy === 'stipend') list.sort((a, b) => b.match - a.match);
    return list;
  }, [search, mode, duration, location, minMatch, sortBy]);

  const handleApply = (opp) => {
    const result = applyToOpportunity({ ...opp, type: 'internship' });
    toast[result.success ? 'success' : 'warning'](result.message);
    setSelected(null);
  };

  return (
    <DashboardLayout>
      <Topbar title="Internships" />
      <div className="p-6 animate-fade-in">
        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search by role, company, or skill..."
            className="flex-1"
          />
          <select className="input w-auto min-w-[140px]" value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="match">Best Match</option>
            <option value="recent">Most Recent</option>
          </select>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-5">
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-surface-400" />
            <span className="text-xs font-semibold text-surface-500">Filter:</span>
          </div>
          {[
            { label: 'Mode', value: mode, options: MODES, setter: setMode },
            { label: 'Duration', value: duration, options: DURATIONS, setter: setDuration },
            { label: 'Location', value: location, options: LOCATIONS, setter: setLocation },
            { label: 'Min Match', value: minMatch, options: MATCH_OPTIONS, setter: setMinMatch },
          ].map(({ label, value, options, setter }) => (
            <select
              key={label}
              value={value}
              onChange={e => setter(e.target.value)}
              className="text-xs border border-surface-200 rounded-lg px-2.5 py-1.5 bg-white text-surface-600 font-medium focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
            >
              {options.map(opt => (
                <option key={opt} value={opt}>{opt === 'All' ? label + ': All' : opt}</option>
              ))}
            </select>
          ))}
          {(mode !== 'All' || duration !== 'All' || location !== 'All' || minMatch !== 'All' || search) && (
            <button
              onClick={() => { setMode('All'); setDuration('All'); setLocation('All'); setMinMatch('All'); setSearch(''); }}
              className="text-xs text-red-600 font-semibold flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <X size={12} /> Clear All
            </button>
          )}
        </div>

        <p className="text-sm text-surface-500 mb-4 font-medium">
          {filtered.length} internship{filtered.length !== 1 ? 's' : ''} found
        </p>

        {filtered.length === 0 ? (
          <div className="card p-16 text-center">
            <Briefcase size={40} className="text-surface-300 mx-auto mb-3" />
            <p className="text-surface-600 font-semibold">No internships match your filters</p>
            <p className="text-sm text-surface-400 mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(opp => (
              <OpportunityCard
                key={opp.id}
                opportunity={opp}
                type="internship"
                onClick={() => setSelected(opp)}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-surface-600 font-medium">{selected.company}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-surface-500">
                  <span className="flex items-center gap-1"><MapPin size={13} />{selected.location}</span>
                  <span className="flex items-center gap-1"><Clock size={13} />{selected.duration}</span>
                  <span className="flex items-center gap-1"><Banknote size={13} />{selected.stipend}</span>
                  <span className={`badge ${selected.mode === 'Remote' ? 'badge-success' : 'badge-info'}`}>{selected.mode}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{selected.match}%</div>
                <div className="text-xs text-surface-500">Match Score</div>
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
                    <CheckCircle size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                    {r}
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
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Eligibility</h3>
              <p className="text-sm text-surface-600">{selected.eligibility}</p>
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
              <button onClick={() => handleApply(selected)} className="btn-primary flex-1">
                Apply Now
              </button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
