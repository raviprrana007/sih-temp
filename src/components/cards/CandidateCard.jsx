import { MapPin, GraduationCap, Star } from 'lucide-react';
import MatchScore from '../ui/MatchScore';

export default function CandidateCard({ candidate, onClick, onShortlist, onContact }) {
  return (
    <div className="card card-hover p-5 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary-700">{candidate.name[0]}</span>
          </div>
          <div>
            <h3 className="text-sm font-display font-semibold text-surface-900">{candidate.name}</h3>
            <p className="text-xs text-surface-500">{candidate.careerGoal}</p>
          </div>
        </div>
        <MatchScore score={candidate.match} size="sm" />
      </div>

      <div className="space-y-1.5 mb-3">
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <GraduationCap size={12} className="text-surface-400" />
          {candidate.institution} · {candidate.degree}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <MapPin size={12} className="text-surface-400" />
          {candidate.location}
        </div>
        <div className="flex items-center gap-1.5 text-xs text-surface-500">
          <Star size={12} className="text-surface-400" />
          Skill Score: <span className="font-semibold text-surface-700">{candidate.skillScore}/100</span>
          · CGPA: <span className="font-semibold text-surface-700">{candidate.cgpa}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {candidate.skills.slice(0, 4).map(s => (
          <span key={s} className="badge-neutral">{s}</span>
        ))}
        {candidate.skills.length > 4 && <span className="badge-neutral">+{candidate.skills.length - 4}</span>}
      </div>

      <div className="flex gap-2 pt-3 border-t border-surface-100">
        <button
          onClick={e => { e.stopPropagation(); onShortlist?.(candidate); }}
          className="btn-secondary flex-1 py-1.5 text-xs"
        >
          Shortlist
        </button>
        <button
          onClick={e => { e.stopPropagation(); onContact?.(candidate); }}
          className="btn-primary flex-1 py-1.5 text-xs"
        >
          Contact
        </button>
      </div>
    </div>
  );
}
