const STATUS_CONFIG = {
  applied: { label: 'Applied', class: 'badge-neutral' },
  under_review: { label: 'Under Review', class: 'badge-info' },
  assessment: { label: 'Assessment', class: 'badge-warning' },
  shortlisted: { label: 'Shortlisted', class: 'badge-primary' },
  interview: { label: 'Interview', class: 'badge-purple' },
  selected: { label: 'Selected', class: 'badge-success' },
  offer: { label: 'Offer', class: 'badge-success' },
  rejected: { label: 'Rejected', class: 'badge-danger' },
  active: { label: 'Active', class: 'badge-success' },
  expired: { label: 'Expired', class: 'badge-danger' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { label: status, class: 'badge-neutral' };
  return <span className={config.class}>{config.label}</span>;
}
