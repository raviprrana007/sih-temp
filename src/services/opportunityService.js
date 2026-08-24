// Opportunity service — replace with real API calls when backend is ready
import { internships } from '../data/internships';
import { jobs } from '../data/jobs';

const BASE_URL = '/api/opportunities';

export const opportunityService = {
  getInternships: async (filters = {}) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/internships?${new URLSearchParams(filters)}`)
    return internships;
  },
  getJobs: async (filters = {}) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/jobs?${new URLSearchParams(filters)}`)
    return jobs;
  },
  getById: async (id, type = 'internship') => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${type}/${id}`)
    const list = type === 'internship' ? internships : jobs;
    return list.find(o => o.id === id);
  },
  apply: async (opportunityId, type, applicationData) => {
    // TODO: Replace with: await fetch(`${BASE_URL}/${type}/${opportunityId}/apply`, { method: 'POST', body: JSON.stringify(applicationData) })
    return { success: true, applicationId: Date.now() };
  },
  postOpportunity: async (opportunityData) => {
    // TODO: Replace with: await fetch(`${BASE_URL}`, { method: 'POST', body: JSON.stringify(opportunityData) })
    return { success: true, id: Date.now(), ...opportunityData };
  },
};
