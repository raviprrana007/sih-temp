export const currentStudent = {
  id: 1,
  name: 'Ravi Prakash Rana',
  email: 'ravi.rana@viit.ac.in',
  phone: '+91 98765 43210',
  avatar: null,
  institution: 'Vishwakarma Institute of Information Technology, Pune',
  degree: 'B.Tech',
  branch: 'Computer Science and Engineering',
  graduationYear: 2026,
  cgpa: 8.4,
  careerGoal: 'Full Stack Developer',
  location: 'Pune, Maharashtra',
  bio: 'Passionate full-stack developer with a focus on building scalable web applications. Love open source and hackathons.',
  linkedin: 'linkedin.com/in/ravi-rana',
  github: 'github.com/ravirana',
  portfolio: 'ravirana.dev',
  careerReadiness: 78,
  skillScore: 74,
  joinedDate: '2025-08-01',
};

export const students = [
  { id: 1, name: 'Ravi Prakash Rana', institution: 'VIIT Pune', degree: 'B.Tech CSE', batch: 2026, skillScore: 74, careerReadiness: 78, cgpa: 8.4, location: 'Pune', skills: ['React', 'Node.js', 'Python', 'PostgreSQL'], careerGoal: 'Full Stack Developer', status: 'Active' },
  { id: 2, name: 'Priya Sharma', institution: 'IIT Bombay', degree: 'B.Tech CS', batch: 2026, skillScore: 88, careerReadiness: 91, cgpa: 9.1, location: 'Mumbai', skills: ['Python', 'ML', 'TensorFlow', 'SQL'], careerGoal: 'ML Engineer', status: 'Active' },
  { id: 3, name: 'Arjun Mehta', institution: 'NIT Warangal', degree: 'B.Tech CSE', batch: 2026, skillScore: 82, careerReadiness: 85, cgpa: 8.9, location: 'Hyderabad', skills: ['Java', 'Spring Boot', 'AWS', 'MySQL'], careerGoal: 'Backend Developer', status: 'Active' },
  { id: 4, name: 'Anjali Singh', institution: 'DTU Delhi', degree: 'B.Tech IT', batch: 2026, skillScore: 79, careerReadiness: 82, cgpa: 8.6, location: 'Delhi', skills: ['React', 'TypeScript', 'Figma', 'UI/UX'], careerGoal: 'Frontend Developer', status: 'Active' },
  { id: 5, name: 'Karan Patel', institution: 'BITS Pilani', degree: 'B.E. CS', batch: 2026, skillScore: 91, careerReadiness: 94, cgpa: 9.3, location: 'Rajasthan', skills: ['Go', 'Kubernetes', 'AWS', 'System Design'], careerGoal: 'DevOps Engineer', status: 'Active' },
  { id: 6, name: 'Sneha Reddy', institution: 'IIIT Hyderabad', degree: 'B.Tech CSE', batch: 2025, skillScore: 86, careerReadiness: 88, cgpa: 8.8, location: 'Hyderabad', skills: ['Python', 'Data Science', 'R', 'Tableau'], careerGoal: 'Data Scientist', status: 'Placed' },
  { id: 7, name: 'Vikram Nair', institution: 'College of Engineering Pune', degree: 'B.E. CS', batch: 2026, skillScore: 71, careerReadiness: 74, cgpa: 7.9, location: 'Pune', skills: ['React Native', 'JavaScript', 'Firebase'], careerGoal: 'Mobile Developer', status: 'Interning' },
  { id: 8, name: 'Deepika Joshi', institution: 'SRM University', degree: 'B.Tech IT', batch: 2026, skillScore: 68, careerReadiness: 70, cgpa: 7.7, location: 'Chennai', skills: ['Python', 'SQL', 'Excel', 'Communication'], careerGoal: 'Product Manager', status: 'Active' },
  { id: 9, name: 'Rohit Kumar', institution: 'VIT Vellore', degree: 'B.Tech CSE', batch: 2026, skillScore: 77, careerReadiness: 80, cgpa: 8.2, location: 'Vellore', skills: ['Java', 'Android', 'Kotlin', 'Firebase'], careerGoal: 'Android Developer', status: 'Active' },
  { id: 10, name: 'Meera Iyer', institution: 'Anna University', degree: 'B.E. CSE', batch: 2026, skillScore: 83, careerReadiness: 86, cgpa: 8.7, location: 'Chennai', skills: ['Cybersecurity', 'Python', 'Linux', 'Networking'], careerGoal: 'Security Engineer', status: 'Active' },
];

export const applications = [
  { id: 1, type: 'internship', companyId: 1, company: 'TechNova Solutions', companyLogo: 'TN', companyColor: '#6366f1', role: 'Full Stack Developer Intern', appliedDate: '2026-08-10', status: 'interview', location: 'Bangalore', mode: 'Hybrid', stipend: '₹20,000/month', nextStep: 'Technical Interview on Aug 26, 2026 at 3:00 PM', match: 92 },
  { id: 2, type: 'internship', companyId: 6, company: 'EduPath', companyLogo: 'EP', companyColor: '#f59e0b', role: 'Frontend Developer Intern', appliedDate: '2026-08-12', status: 'assessment', location: 'Delhi', mode: 'Remote', stipend: '₹12,000/month', nextStep: 'Complete Frontend Assignment by Aug 25, 2026', match: 88 },
  { id: 3, type: 'job', companyId: 8, company: 'EduPath', companyLogo: 'EP', companyColor: '#f59e0b', role: 'Frontend Engineer', appliedDate: '2026-08-08', status: 'shortlisted', location: 'Delhi', mode: 'Remote', salary: '₹6–10 LPA', nextStep: 'Interview scheduled for Sept 2, 2026', match: 85 },
  { id: 4, type: 'job', companyId: 4, company: 'FinEdge Technologies', companyLogo: 'FE', companyColor: '#10b981', role: 'Software Development Engineer', appliedDate: '2026-08-05', status: 'under_review', location: 'Mumbai', mode: 'Hybrid', salary: '₹10–15 LPA', nextStep: 'Application under review', match: 68 },
  { id: 5, type: 'internship', companyId: 7, company: 'Nexus Analytics', companyLogo: 'NA', companyColor: '#06b6d4', role: 'Data Analyst Intern', appliedDate: '2026-08-01', status: 'rejected', location: 'Bangalore', mode: 'Remote', stipend: '₹15,000/month', nextStep: 'Application was not selected', match: 68 },
  { id: 6, type: 'job', companyId: 1, company: 'TechNova Solutions', companyLogo: 'TN', companyColor: '#6366f1', role: 'Backend Engineer', appliedDate: '2026-08-15', status: 'applied', location: 'Bangalore', mode: 'Hybrid', salary: '₹9–13 LPA', nextStep: 'Application submitted. Awaiting review.', match: 76 },
];

export const projects = [
  { id: 1, name: 'DevConnect', description: 'A platform for developers to connect, share projects, and collaborate. Built with React, Node.js, and PostgreSQL.', tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'], github: 'github.com/ravirana/devconnect', demo: 'devconnect.vercel.app', stars: 47, status: 'completed', featured: true },
  { id: 2, name: 'SpendWise', description: 'Personal finance tracker with AI-powered insights. Tracks expenses, sets budgets, and provides spending analysis.', tech: ['React', 'Python', 'FastAPI', 'Chart.js'], github: 'github.com/ravirana/spendwise', demo: '', stars: 23, status: 'completed', featured: true },
  { id: 3, name: 'OpenNote', description: 'Real-time collaborative note-taking app with markdown support and smart organization.', tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'], github: 'github.com/ravirana/opennote', demo: 'opennote.netlify.app', stars: 31, status: 'in_progress', featured: false },
  { id: 4, name: 'CLI Weather Tool', description: 'Command-line weather application using Python that fetches real-time weather data.', tech: ['Python', 'Click', 'OpenWeatherAPI'], github: 'github.com/ravirana/cli-weather', demo: '', stars: 12, status: 'completed', featured: false },
];

export const achievements = [
  { id: 1, title: 'Smart India Hackathon 2025 — Finalist', date: '2025-09-15', description: 'Reached national finals among 50,000+ participants. Built an AI-powered crop disease detection system.', icon: 'trophy' },
  { id: 2, title: 'HackMIT 2025 — Best Use of AI', date: '2025-10-20', description: 'Won Best Use of AI prize for building a real-time ASL translation system using computer vision.', icon: 'award' },
  { id: 3, title: 'LeetCode — Top 15% Globally', date: '2026-01-01', description: 'Solved 300+ problems. Achieved a rating of 1820 on LeetCode contests.', icon: 'code' },
  { id: 4, title: 'Google Developer Student Club Lead', date: '2025-08-01', description: 'Selected as GDSC Lead for VIIT Pune. Organized 20+ events with 2000+ attendees.', icon: 'users' },
];
