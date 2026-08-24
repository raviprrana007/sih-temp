import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-primary-600', iconBg = 'bg-primary-50', trend, trendValue, suffix = '', prefix = '' }) {
  const isPositive = trend === 'up';

  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-surface-500 uppercase tracking-wide">{title}</p>
          <div className="mt-1.5 flex items-baseline gap-1">
            {prefix && <span className="text-sm text-surface-500">{prefix}</span>}
            <span className="text-2xl font-display font-bold text-surface-900">{value}</span>
            {suffix && <span className="text-sm text-surface-500">{suffix}</span>}
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
          <Icon size={20} className={iconColor} />
        </div>
      </div>
      {(subtitle || trendValue) && (
        <div className="flex items-center gap-2">
          {trendValue && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {trendValue}
            </span>
          )}
          {subtitle && <p className="text-xs text-surface-500">{subtitle}</p>}
        </div>
      )}
    </div>
  );
}
