import { useState } from 'react';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-surface-50">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        {children}
      </main>
    </div>
  );
}
