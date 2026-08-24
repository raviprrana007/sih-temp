export const companies = [
  { id: 1, name: 'TechNova Solutions', logo: 'TN', color: '#6366f1', industry: 'Software', size: '500-1000', location: 'Bangalore', website: 'technova.io' },
  { id: 2, name: 'InfraCloud', logo: 'IC', color: '#0ea5e9', industry: 'Cloud Infrastructure', size: '200-500', location: 'Pune', website: 'infracloud.io' },
  { id: 3, name: 'DataSense AI', logo: 'DS', color: '#8b5cf6', industry: 'AI/ML', size: '100-200', location: 'Hyderabad', website: 'datasense.ai' },
  { id: 4, name: 'FinEdge Technologies', logo: 'FE', color: '#10b981', industry: 'FinTech', size: '1000+', location: 'Mumbai', website: 'finedge.tech' },
  { id: 5, name: 'HealthSync', logo: 'HS', color: '#ef4444', industry: 'HealthTech', size: '200-500', location: 'Chennai', website: 'healthsync.in' },
  { id: 6, name: 'EduPath', logo: 'EP', color: '#f59e0b', industry: 'EdTech', size: '50-100', location: 'Delhi', website: 'edupath.in' },
  { id: 7, name: 'Nexus Analytics', logo: 'NA', color: '#06b6d4', industry: 'Data Analytics', size: '100-200', location: 'Bangalore', website: 'nexusanalytics.io' },
  { id: 8, name: 'CyberShield', logo: 'CS', color: '#dc2626', industry: 'Cybersecurity', size: '200-500', location: 'Pune', website: 'cybershield.in' },
  { id: 9, name: 'LogiChain', logo: 'LC', color: '#7c3aed', industry: 'Supply Chain Tech', size: '500-1000', location: 'Hyderabad', website: 'logichain.co' },
  { id: 10, name: 'GreenTech India', logo: 'GT', color: '#16a34a', industry: 'CleanTech', size: '100-200', location: 'Ahmedabad', website: 'greentechindia.com' },
];

export const getCompanyById = (id) => companies.find(c => c.id === id);
