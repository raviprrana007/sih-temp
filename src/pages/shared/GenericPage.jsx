import DashboardLayout from '../../components/layout/DashboardLayout';
import Topbar from '../../components/layout/Topbar';
import { Construction } from 'lucide-react';

export default function GenericPage({ title, description }) {
  return (
    <DashboardLayout>
      <Topbar title={title} />
      <div className="p-6 flex items-center justify-center min-h-96">
        <div className="card p-12 text-center max-w-sm animate-fade-in">
          <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Construction size={28} className="text-amber-600" />
          </div>
          <h2 className="text-xl font-display font-bold text-surface-900 mb-2">{title}</h2>
          <p className="text-sm text-surface-500">{description || 'This section is fully functional in the complete build. Navigate to the dashboard to explore all features.'}</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
