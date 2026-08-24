export function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex gap-1 border-b border-surface-200 ${className}`}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={active === tab.id ? 'tab-active' : 'tab'}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className={`ml-1.5 px-1.5 py-0.5 rounded text-xs font-semibold ${
              active === tab.id ? 'bg-primary-100 text-primary-700' : 'bg-surface-100 text-surface-500'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
