export default function MatchScore({ score, size = 'sm' }) {
  const color = score >= 85 ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
    : score >= 70 ? 'text-primary-600 bg-primary-50 border-primary-200'
    : score >= 50 ? 'text-amber-600 bg-amber-50 border-amber-200'
    : 'text-surface-500 bg-surface-100 border-surface-200';

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5 font-bold',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border font-semibold ${color} ${sizes[size]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      {score}% Match
    </span>
  );
}
