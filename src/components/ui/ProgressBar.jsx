export default function ProgressBar({ value, max = 100, color = 'primary', height = 'sm', showLabel = false, label = '' }) {
  const percent = Math.min(100, Math.round((value / max) * 100));

  const colors = {
    primary: 'bg-primary-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
    info: 'bg-accent-500',
    purple: 'bg-purple-500',
  };

  const heights = {
    xs: 'h-1',
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  };

  return (
    <div className="w-full">
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-xs text-surface-600">{label}</span>}
          {showLabel && <span className="text-xs font-semibold text-surface-700">{percent}%</span>}
        </div>
      )}
      <div className={`w-full ${heights[height]} bg-surface-100 rounded-full overflow-hidden`}>
        <div
          className={`${heights[height]} ${colors[color] || color} rounded-full transition-all duration-700`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
