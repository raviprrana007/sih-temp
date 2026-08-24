import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const MOCK_USERS = {
  student: { id: 1, name: 'Ravi Prakash Rana', email: 'student@viit.ac.in', role: 'student', avatar: null },
  industry: { id: 2, name: 'Rahul Sharma', email: 'rahul@technova.io', role: 'industry', company: 'TechNova Solutions', avatar: null },
  academician: { id: 3, name: 'Dr. Sunita Kulkarni', email: 'sunita@viit.ac.in', role: 'academician', avatar: null },
  institution: { id: 4, name: 'VIIT Admin', email: 'admin@viit.ac.in', role: 'institution', institution: 'VIIT Pune', avatar: null },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('skillbridge_user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
    setLoading(false);
  }, []);

  const login = (email, password, role) => {
    const mockUser = MOCK_USERS[role];
    if (mockUser) {
      const u = { ...mockUser, email: email || mockUser.email };
      setUser(u);
      localStorage.setItem('skillbridge_user', JSON.stringify(u));
      return { success: true, user: u };
    }
    return { success: false, error: 'Invalid credentials' };
  };

  const register = (data, role) => {
    const base = MOCK_USERS[role];
    const u = { ...base, ...data, role };
    setUser(u);
    localStorage.setItem('skillbridge_user', JSON.stringify(u));
    return { success: true, user: u };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillbridge_user');
  };

  const updateUser = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('skillbridge_user', JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
