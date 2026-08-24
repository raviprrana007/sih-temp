export default function CompanyAvatar({ logo, color, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-xl',
  };
  return (
    <div
      className={`${sizes[size]} rounded-lg flex items-center justify-center font-display font-bold text-white flex-shrink-0 ${className}`}
      style={{ backgroundColor: color || '#6366f1' }}
    >
      {logo}
    </div>
  );
}
