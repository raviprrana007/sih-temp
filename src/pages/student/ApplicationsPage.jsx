import { useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import StatusBadge from '../../components/ui/StatusBadge';
import CompanyAvatar from '../../components/ui/CompanyAvatar';
import { Tabs } from '../../components/ui/Tabs';
import { useApp } from '../../context/AppContext';
import { MapPin, Calendar, ChevronRight, FileText } from 'lucide-react';

const PIPELINE = [
  { key: 'applied', label: 'Applied' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'assessment', label: 'Assessment' },
  { key: 'shortlisted', label: 'Shortlisted' },
  { key: 'interview', label: 'Interview' },
  { key: 'offer', label: 'Offer' },
];

const STATUS_COLORS = {
  applied: 'bg-surface-100 text-surface-600',
  under_review: 'bg-accent-100 text-accent-700',
  assessment: 'bg-amber-100 text-amber-700',
  shortlisted: 'bg-primary-100 text-primary-700',
  interview: 'bg-purple-100 text-purple-700',
  offer: 'bg-emerald-100 text-emerald-700',
  selected: 'bg-emerald-100 text-emerald-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function ApplicationsPage() {
  const [tab, setTab] = useState('list');
  const { applications } = useApp();
  const tabs = [
    { id: 'list', label: 'List View', count: applications.length },
    { id: 'pipeline', label: 'Pipeline View' },
  ];

  return (
    <DashboardLayout>
      <Topbar title="My Applications" />
      <div className="p-6 animate-fade-in">
        {/* Summary */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
          {PIPELINE.map(({ key, label }) => {
            const count = applications.filter(a => a.status === key).length;
            return (
              <div key={key} className="card p-3 text-center">
                <div className={`text-xl font-display font-bold ${count > 0 ? 'text-surface-900' : 'text-surface-300'}`}>{count}</div>
                <div className="text-[10px] text-surface-500 mt-0.5 font-medium">{label}</div>
              </div>
            );
          })}
        </div>

        <Tabs tabs={tabs} active={tab} onChange={setTab} className="mb-5" />

        {tab === 'list' ? (
          <div className="space-y-3">
            {applications.length === 0 ? (
              <div className="card p-16 text-center">
                <FileText size={40} className="text-surface-300 mx-auto mb-3" />
                <p className="text-surface-600 font-semibold">No applications yet</p>
                <p className="text-sm text-surface-400 mt-1">Start applying to internships and jobs to track your progress here.</p>
              </div>
            ) : (
              applications.map(app => (
                <div key={app.id} className="card p-4 flex items-center gap-4">
                  <CompanyAvatar logo={app.companyLogo} color={app.companyColor} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div>
                        <h3 className="text-sm font-semibold text-surface-900">{app.role}</h3>
                        <p className="text-xs text-surface-500 mt-0.5">{app.company}</p>
                      </div>
                      <StatusBadge status={app.status} />
                    </div>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-xs text-surface-400">
                      <span className="flex items-center gap-1"><MapPin size={10} />{app.location}</span>
                      <span className="capitalize">{app.type}</span>
                      {app.stipend && <span>{app.stipend}</span>}
                      {app.salary && <span>{app.salary}</span>}
                      <span className="flex items-center gap-1"><Calendar size={10} />Applied {app.appliedDate}</span>
                    </div>
                    <div className="mt-2 text-xs text-primary-600 font-medium">{app.nextStep}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          // Pipeline/Kanban view
          <div className="overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-4">
              {PIPELINE.map(({ key, label }) => {
                const columnApps = applications.filter(a => a.status === key);
                return (
                  <div key={key} className="w-56 flex-shrink-0">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLORS[key]}`}>{label}</span>
                      <span className="text-xs text-surface-400 font-semibold">{columnApps.length}</span>
                    </div>
                    <div className="space-y-2">
                      {columnApps.map(app => (
                        <div key={app.id} className="card p-3 cursor-pointer hover:shadow-card-md transition-all">
                          <div className="flex items-center gap-2 mb-2">
                            <CompanyAvatar logo={app.companyLogo} color={app.companyColor} size="sm" />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-surface-800 truncate">{app.role}</div>
                              <div className="text-[10px] text-surface-500">{app.company}</div>
                            </div>
                          </div>
                          <div className="text-[10px] text-surface-400">{app.appliedDate}</div>
                          {app.match && (
                            <div className="mt-1.5">
                              <span className="text-[10px] font-semibold text-emerald-600">{app.match}% match</span>
                            </div>
                          )}
                        </div>
                      ))}
                      {columnApps.length === 0 && (
                        <div className="h-20 rounded-xl border-2 border-dashed border-surface-200 flex items-center justify-center text-xs text-surface-400">
                          No applications
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
