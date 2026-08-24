// Auth service — replace with real API calls when backend is ready
const BASE_URL = '/api/auth';

export const authService = {
  login: async (email, password, role) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/login`, { method: 'POST', body: JSON.stringify({ email, password, role }) })
    return { success: true, token: 'mock-jwt-token', user: { email, role } };
  },
  register: async (data, role) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/register`, { method: 'POST', body: JSON.stringify({ ...data, role }) })
    return { success: true, token: 'mock-jwt-token', user: { ...data, role } };
  },
  logout: async () => {
    // TODO: Replace with: await fetch(`${BASE_URL}/logout`, { method: 'POST' })
    return { success: true };
  },
};
