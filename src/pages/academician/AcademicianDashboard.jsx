import { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import StatCard from '../../components/cards/StatCard';
import CompanyAvatar from '../../components/ui/CompanyAvatar';
import StatusBadge from '../../components/ui/StatusBadge';
import Modal from '../../components/ui/Modal';
import { currentFaculty, facultyOpportunities, facultyApplications } from '../../data/academician';
import { useApp } from '../../context/AppContext';
import { toast } from '../../components/ui/Toast';
import {
  Briefcase, Users, BookOpen, FlaskConical, Award, ChevronRight,
  MapPin, Clock, Banknote, CheckCircle, Calendar,
} from 'lucide-react';

const TYPE_STYLES = {
  'Faculty Internship': 'badge-primary',
  'Industrial Training': 'badge-info',
  'FDP': 'badge-purple',
  'Workshop': 'badge-warning',
  'Consultancy': 'badge-success',
  'Research Collaboration': 'badge-danger',
  'Live Industry Project': 'badge-neutral',
};

export default function AcademicianDashboard() {
  const [selected, setSelected] = useState(null);
  const { applyToOpportunity } = useApp();

  const handleApply = (opp) => {
    toast.success(`Application submitted for ${opp.title}!`);
    setSelected(null);
  };

  return (
    <DashboardLayout>
      <Topbar />
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-display font-bold text-surface-900">
            Welcome, {currentFaculty.name}
          </h1>
          <p className="text-surface-500 text-sm mt-1">{currentFaculty.designation} · {currentFaculty.department}</p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          {[
            { title: 'Applications', value: facultyApplications.length, icon: Briefcase, iconColor: 'text-primary-600', iconBg: 'bg-primary-50' },
            { title: 'Active Programs', value: 2, icon: BookOpen, iconColor: 'text-accent-600', iconBg: 'bg-accent-50' },
            { title: 'Industry Connections', value: 8, icon: Users, iconColor: 'text-purple-600', iconBg: 'bg-purple-50' },
            { title: 'Research Collabs', value: 3, icon: FlaskConical, iconColor: 'text-emerald-600', iconBg: 'bg-emerald-50' },
            { title: 'FDPs Attended', value: 7, icon: Award, iconColor: 'text-amber-600', iconBg: 'bg-amber-50' },
          ].map(s => <StatCard key={s.title} {...s} />)}
        </div>

        {/* Opportunities */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">Available Opportunities</h2>
            <Link to="/academician/opportunities" className="text-xs text-primary-600 font-semibold flex items-center gap-1">
              View All <ChevronRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {facultyOpportunities.map(opp => (
              <div key={opp.id} className="card card-hover p-5 cursor-pointer" onClick={() => setSelected(opp)}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <CompanyAvatar logo={opp.companyLogo} color={opp.companyColor} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-surface-900">{opp.title}</p>
                      <p className="text-xs text-surface-500">{opp.company}</p>
                    </div>
                  </div>
                  <span className={TYPE_STYLES[opp.type] || 'badge-neutral'}>{opp.type}</span>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-surface-500">
                    <Clock size={11} className="text-surface-400" />{opp.duration}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-500">
                    <MapPin size={11} className="text-surface-400" />{opp.location} · {opp.mode}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-surface-500">
                    <Banknote size={11} className="text-surface-400" />{opp.stipend}
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {opp.skills.slice(0, 3).map(s => <span key={s} className="badge-neutral">{s}</span>)}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-surface-100">
                  <span className="text-xs text-surface-400">Deadline: {opp.deadline}</span>
                  <span className="text-xs font-bold text-emerald-600">{opp.match}% Match</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Applications */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title">My Applications</h2>
            <Link to="/academician/applications" className="text-xs text-primary-600 font-semibold">
              View All <ChevronRight size={12} className="inline" />
            </Link>
          </div>
          <div className="space-y-3">
            {facultyApplications.map(app => (
              <div key={app.id} className="flex items-center gap-4 p-3 bg-surface-50 rounded-xl">
                <div className="w-9 h-9 bg-primary-100 rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold text-primary-700">{app.company[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-surface-800">{app.role}</p>
                  <p className="text-xs text-surface-500">{app.company} · {app.type}</p>
                  <p className="text-xs text-primary-600 font-medium mt-0.5">{app.nextStep}</p>
                </div>
                <StatusBadge status={app.status} />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'FDP Programs', link: '/academician/fdp', icon: Award, color: 'bg-purple-50 text-purple-600' },
            { label: 'Workshops', link: '/academician/workshops', icon: Calendar, color: 'bg-accent-50 text-accent-600' },
            { label: 'Consultancy', link: '/academician/consultancy', icon: Briefcase, color: 'bg-emerald-50 text-emerald-600' },
            { label: 'Research', link: '/academician/research', icon: FlaskConical, color: 'bg-amber-50 text-amber-600' },
          ].map(item => {
            const Icon = item.icon;
            return (
              <Link key={item.label} to={item.link} className="card card-hover p-4 flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={18} />
                </div>
                <span className="text-sm font-semibold text-surface-700">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Detail Modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title} size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className={TYPE_STYLES[selected.type] || 'badge-neutral'}>{selected.type}</span>
                <p className="text-surface-600 font-medium mt-2">{selected.company}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-emerald-600">{selected.match}%</div>
                <div className="text-xs text-surface-500">Match</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-surface-500">
              <span className="flex items-center gap-1"><Clock size={13} />{selected.duration}</span>
              <span className="flex items-center gap-1"><MapPin size={13} />{selected.location} · {selected.mode}</span>
              <span className="flex items-center gap-1"><Banknote size={13} />{selected.stipend}</span>
            </div>

            <p className="text-sm text-surface-600 leading-relaxed">{selected.description}</p>

            <div>
              <h3 className="text-sm font-semibold text-surface-700 mb-2">Required Expertise</h3>
              <div className="flex flex-wrap gap-1.5">
                {selected.skills.map(s => <span key={s} className="badge-primary">{s}</span>)}
              </div>
            </div>

            <div className="text-xs text-surface-400">Application Deadline: <span className="font-semibold text-surface-600">{selected.deadline}</span></div>

            <div className="flex gap-3 pt-2 border-t border-surface-100">
              <button onClick={() => setSelected(null)} className="btn-secondary flex-1">Cancel</button>
              <button onClick={() => handleApply(selected)} className="btn-primary flex-1">Submit Application</button>
            </div>
          </div>
        )}
      </Modal>
    </DashboardLayout>
  );
}
