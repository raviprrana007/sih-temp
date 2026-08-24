import { MapPin, Clock, Banknote, BookmarkPlus, BookmarkCheck, ExternalLink, Wifi, Building2 } from 'lucide-react';
import CompanyAvatar from '../ui/CompanyAvatar';
import MatchScore from '../ui/MatchScore';
import { useApp } from '../../context/AppContext';
import { toast } from '../ui/Toast';

const modeIcons = { Remote: Wifi, 'On-site': Building2, Hybrid: Building2 };

export default function OpportunityCard({ opportunity, type = 'internship', onClick, onApply }) {
  const { savedInternships, savedJobs, toggleSaveInternship, toggleSaveJob, applyToOpportunity } = useApp();
  const saved = type === 'internship' ? savedInternships.includes(opportunity.id) : savedJobs.includes(opportunity.id);

  const handleSave = (e) => {
    e.stopPropagation();
    if (type === 'internship') toggleSaveInternship(opportunity.id);
    else toggleSaveJob(opportunity.id);
  };

  const handleApply = (e) => {
    e.stopPropagation();
    if (onApply) return onApply(opportunity);
    const result = applyToOpportunity({ ...opportunity, type });
    if (result.success) toast.success(result.message);
    else toast.warning(result.message);
  };

  return (
    <div
      className="card card-hover p-5 cursor-pointer flex flex-col gap-4"
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        <CompanyAvatar logo={opportunity.companyLogo} color={opportunity.companyColor} size="md" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-display font-semibold text-surface-900 leading-tight">{opportunity.title}</h3>
              <p className="text-xs text-surface-500 mt-0.5 font-medium">{opportunity.company}</p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <MatchScore score={opportunity.match} size="sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-x-3 gap-y-1.5">
        <span className="flex items-center gap-1 text-xs text-surface-500">
          <MapPin size={12} className="text-surface-400" />
          {opportunity.location}
        </span>
        <span className="flex items-center gap-1 text-xs text-surface-500">
          <Clock size={12} className="text-surface-400" />
          {opportunity.duration || opportunity.experience}
        </span>
        <span className="flex items-center gap-1 text-xs text-surface-500">
          <Banknote size={12} className="text-surface-400" />
          {opportunity.stipend || opportunity.salary}
        </span>
        <span className={`badge text-xs ${opportunity.mode === 'Remote' ? 'badge-success' : opportunity.mode === 'Hybrid' ? 'badge-info' : 'badge-neutral'}`}>
          {opportunity.mode}
        </span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5">
        {opportunity.skills.slice(0, 4).map(skill => (
          <span key={skill} className="badge-neutral">{skill}</span>
        ))}
        {opportunity.skills.length > 4 && (
          <span className="badge-neutral">+{opportunity.skills.length - 4}</span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-surface-100">
        <span className="text-xs text-surface-400">Posted {opportunity.posted}</span>
        <div className="flex items-center gap-2">
          <button onClick={handleSave} className="btn-ghost py-1.5 px-2 text-xs">
            {saved ? (
              <BookmarkCheck size={15} className="text-primary-600" />
            ) : (
              <BookmarkPlus size={15} />
            )}
          </button>
          <button onClick={handleApply} className="btn-primary py-1.5 text-xs">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
