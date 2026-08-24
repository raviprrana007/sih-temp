// Institution analytics data
export const skillDemandData = [
  { skill: 'React', demand: 92 },
  { skill: 'Python', demand: 88 },
  { skill: 'Node.js', demand: 82 },
  { skill: 'AWS', demand: 79 },
  { skill: 'Machine Learning', demand: 75 },
  { skill: 'Docker', demand: 72 },
  { skill: 'SQL', demand: 70 },
  { skill: 'Kubernetes', demand: 65 },
  { skill: 'System Design', demand: 63 },
  { skill: 'TypeScript', demand: 60 },
];

export const placementData = [
  { month: 'Feb', applied: 245, shortlisted: 120, interviewed: 85, placed: 62 },
  { month: 'Mar', applied: 312, shortlisted: 148, interviewed: 103, placed: 78 },
  { month: 'Apr', applied: 287, shortlisted: 135, interviewed: 95, placed: 71 },
  { month: 'May', applied: 398, shortlisted: 198, interviewed: 142, placed: 105 },
  { month: 'Jun', applied: 445, shortlisted: 220, interviewed: 160, placed: 118 },
  { month: 'Jul', applied: 521, shortlisted: 265, interviewed: 189, placed: 142 },
  { month: 'Aug', applied: 489, shortlisted: 248, interviewed: 176, placed: 132 },
];

export const internshipByDept = [
  { dept: 'CSE', count: 145, fill: '#6366f1' },
  { dept: 'IT', count: 89, fill: '#0ea5e9' },
  { dept: 'ECE', count: 67, fill: '#8b5cf6' },
  { dept: 'Mechanical', count: 34, fill: '#f59e0b' },
  { dept: 'Civil', count: 21, fill: '#10b981' },
  { dept: 'Chemical', count: 18, fill: '#ef4444' },
];

export const skillDistribution = [
  { name: '90-100', students: 45 },
  { name: '80-89', students: 128 },
  { name: '70-79', students: 214 },
  { name: '60-69', students: 187 },
  { name: '50-59', students: 142 },
  { name: 'Below 50', students: 89 },
];

export const industryDemandTrends = [
  { month: 'Mar', aiml: 45, cloud: 62, webdev: 78, mobile: 35, security: 28 },
  { month: 'Apr', aiml: 52, cloud: 68, webdev: 82, mobile: 38, security: 32 },
  { month: 'May', aiml: 61, cloud: 71, webdev: 85, mobile: 42, security: 35 },
  { month: 'Jun', aiml: 70, cloud: 75, webdev: 88, mobile: 48, security: 40 },
  { month: 'Jul', aiml: 78, cloud: 79, webdev: 90, mobile: 52, security: 44 },
  { month: 'Aug', aiml: 85, cloud: 83, webdev: 92, mobile: 55, security: 48 },
];

// Industry dashboard analytics
export const applicationsOverTime = [
  { date: 'Aug 1', applications: 12 },
  { date: 'Aug 5', applications: 19 },
  { date: 'Aug 10', applications: 28 },
  { date: 'Aug 15', applications: 22 },
  { date: 'Aug 17', applications: 35 },
  { date: 'Aug 19', applications: 41 },
  { date: 'Aug 21', applications: 38 },
  { date: 'Aug 23', applications: 52 },
];

export const candidateSkillDist = [
  { skill: 'React', candidates: 145 },
  { skill: 'Python', candidates: 132 },
  { skill: 'Java', candidates: 118 },
  { skill: 'Node.js', candidates: 89 },
  { skill: 'AWS', candidates: 67 },
  { skill: 'ML', candidates: 54 },
];

export const candidates = [
  { id: 1, name: 'Karan Patel', institution: 'BITS Pilani', degree: 'B.E. CS', batch: 2026, skillScore: 91, careerReadiness: 94, cgpa: 9.3, location: 'Jaipur', skills: ['Go', 'Kubernetes', 'AWS', 'System Design', 'Docker'], careerGoal: 'DevOps Engineer', match: 96, availability: 'Immediate', bio: 'Passionate about cloud-native technologies. Contributed to 3 open source projects with 200+ GitHub stars.' },
  { id: 2, name: 'Priya Sharma', institution: 'IIT Bombay', degree: 'B.Tech CS', batch: 2026, skillScore: 88, careerReadiness: 91, cgpa: 9.1, location: 'Mumbai', skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Pandas'], careerGoal: 'ML Engineer', match: 93, availability: 'July 2026', bio: 'Research intern at AI Lab IIT Bombay. Published paper on NLP at ICML 2025.' },
  { id: 3, name: 'Arjun Mehta', institution: 'NIT Warangal', degree: 'B.Tech CSE', batch: 2026, skillScore: 82, careerReadiness: 85, cgpa: 8.9, location: 'Hyderabad', skills: ['Java', 'Spring Boot', 'AWS', 'MySQL', 'Microservices'], careerGoal: 'Backend Developer', match: 89, availability: 'June 2026', bio: 'Built microservices platform handling 10K+ RPM. SDE Intern at Flipkart.' },
  { id: 4, name: 'Anjali Singh', institution: 'DTU Delhi', degree: 'B.Tech IT', batch: 2026, skillScore: 79, careerReadiness: 82, cgpa: 8.6, location: 'Delhi', skills: ['React', 'TypeScript', 'Figma', 'Next.js', 'CSS'], careerGoal: 'Frontend Developer', match: 87, availability: 'Immediate', bio: 'Frontend developer with strong design sensibility. Built 5+ production apps.' },
  { id: 5, name: 'Ravi Prakash Rana', institution: 'VIIT Pune', degree: 'B.Tech CSE', batch: 2026, skillScore: 74, careerReadiness: 78, cgpa: 8.4, location: 'Pune', skills: ['React', 'Node.js', 'PostgreSQL', 'Python', 'Git'], careerGoal: 'Full Stack Developer', match: 92, availability: 'Immediate', bio: 'GDSC Lead, SIH Finalist. Built DevConnect — a developer collaboration platform with 500+ users.' },
  { id: 6, name: 'Rohit Kumar', institution: 'VIT Vellore', degree: 'B.Tech CSE', batch: 2026, skillScore: 77, careerReadiness: 80, cgpa: 8.2, location: 'Chennai', skills: ['Java', 'Android', 'Kotlin', 'Firebase', 'REST APIs'], careerGoal: 'Android Developer', match: 84, availability: 'June 2026', bio: 'Published 2 apps on Play Store with 5000+ downloads. Android Developer at startup.' },
  { id: 7, name: 'Meera Iyer', institution: 'Anna University', degree: 'B.E. CSE', batch: 2026, skillScore: 83, careerReadiness: 86, cgpa: 8.7, location: 'Chennai', skills: ['Cybersecurity', 'Python', 'Linux', 'Network Security', 'Pen Testing'], careerGoal: 'Security Engineer', match: 78, availability: 'July 2026', bio: 'Bug bounty hunter with 15+ CVEs. CTF competitor — ranked in top 100 globally.' },
  { id: 8, name: 'Deepika Joshi', institution: 'SRM University', degree: 'B.Tech IT', batch: 2026, skillScore: 68, careerReadiness: 70, cgpa: 7.7, location: 'Chennai', skills: ['Python', 'SQL', 'Tableau', 'Data Analysis', 'Excel'], careerGoal: 'Data Analyst', match: 72, availability: 'Immediate', bio: 'Completed Google Data Analytics certification. Interned at Mu Sigma as data analyst.' },
];
