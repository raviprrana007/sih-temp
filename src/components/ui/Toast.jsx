import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} className="text-emerald-500" />,
  error: <XCircle size={18} className="text-red-500" />,
  warning: <AlertCircle size={18} className="text-amber-500" />,
};

export function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="flex items-center gap-3 bg-white border border-surface-200 rounded-xl px-4 py-3 shadow-card-lg animate-slide-up min-w-[280px]">
      {icons[type]}
      <p className="text-sm font-medium text-surface-800 flex-1">{message}</p>
      <button onClick={onClose} className="text-surface-400 hover:text-surface-600">
        <X size={16} />
      </button>
    </div>
  );
}

let _setToasts = null;

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  _setToasts = setToasts;

  const remove = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2">
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => remove(t.id)} />
      ))}
    </div>
  );
}

export const toast = {
  success: (message) => {
    if (_setToasts) _setToasts(prev => [...prev, { id: Date.now(), message, type: 'success' }]);
  },
  error: (message) => {
    if (_setToasts) _setToasts(prev => [...prev, { id: Date.now(), message, type: 'error' }]);
  },
  warning: (message) => {
    if (_setToasts) _setToasts(prev => [...prev, { id: Date.now(), message, type: 'warning' }]);
  },
};
