// Student service — replace with real API calls when backend is ready
import { students, currentStudent, applications } from '../data/students';

const BASE_URL = '/api/students';

export const studentService = {
  getProfile: async (id) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${id}`)
    return currentStudent;
  },
  updateProfile: async (id, data) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
    return { success: true, ...data };
  },
  getApplications: async (id) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${id}/applications`)
    return applications;
  },
  getSkillProfile: async (id) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${id}/skills`)
    return { skillScore: 74, careerReadiness: 78 };
  },
};
