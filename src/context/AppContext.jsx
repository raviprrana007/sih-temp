import { createContext, useContext, useState, useEffect } from 'react';
import { applications as initialApplications } from '../data/students';
import { internships as initialInternships } from '../data/internships';
import { jobs as initialJobs } from '../data/jobs';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [applications, setApplications] = useState(() => {
    const stored = localStorage.getItem('sb_applications');
    return stored ? JSON.parse(stored) : initialApplications;
  });

  const [savedInternships, setSavedInternships] = useState(() => {
    const stored = localStorage.getItem('sb_saved_internships');
    return stored ? JSON.parse(stored) : initialInternships.filter(i => i.saved).map(i => i.id);
  });

  const [savedJobs, setSavedJobs] = useState(() => {
    const stored = localStorage.getItem('sb_saved_jobs');
    return stored ? JSON.parse(stored) : initialJobs.filter(j => j.saved).map(j => j.id);
  });

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'match', title: 'New Job Match', message: 'TechNova is looking for Full Stack Developers — 89% match!', time: '2 min ago', read: false, icon: 'briefcase' },
    { id: 2, type: 'application', title: 'Interview Scheduled', message: 'Your interview with TechNova Solutions is confirmed for Aug 26 at 3 PM.', time: '1 hour ago', read: false, icon: 'calendar' },
    { id: 3, type: 'assessment', title: 'Assessment Reminder', message: 'You have a pending skill assessment. Complete it to improve your match score.', time: '3 hours ago', read: true, icon: 'clipboard' },
    { id: 4, type: 'course', title: 'Course Update', message: 'New module added to "System Design Fundamentals" course you\'re enrolled in.', time: '1 day ago', read: true, icon: 'book' },
    { id: 5, type: 'workshop', title: 'Workshop Tomorrow', message: 'React Advanced Patterns workshop starts tomorrow at 11 AM. Don\'t forget to join!', time: '2 days ago', read: true, icon: 'video' },
    { id: 6, type: 'application', title: 'Application Status Update', message: 'Your application to EduPath for Frontend Developer Intern has moved to Assessment stage.', time: '2 days ago', read: true, icon: 'check-circle' },
  ]);

  const [assessmentResults, setAssessmentResults] = useState(() => {
    const stored = localStorage.getItem('sb_assessment_results');
    return stored ? JSON.parse(stored) : null;
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('sb_theme') || 'light');

  useEffect(() => {
    localStorage.setItem('sb_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('sb_saved_internships', JSON.stringify(savedInternships));
  }, [savedInternships]);

  useEffect(() => {
    localStorage.setItem('sb_saved_jobs', JSON.stringify(savedJobs));
  }, [savedJobs]);

  useEffect(() => {
    if (assessmentResults) {
      localStorage.setItem('sb_assessment_results', JSON.stringify(assessmentResults));
    }
  }, [assessmentResults]);

  const applyToOpportunity = (opportunity) => {
    const existing = applications.find(a => a.company === opportunity.company && a.role === opportunity.title);
    if (existing) return { success: false, message: 'Already applied to this opportunity' };
    const newApp = {
      id: Date.now(),
      type: opportunity.type || 'internship',
      companyId: opportunity.companyId,
      company: opportunity.company,
      companyLogo: opportunity.companyLogo,
      companyColor: opportunity.companyColor,
      role: opportunity.title,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'applied',
      location: opportunity.location,
      mode: opportunity.mode,
      stipend: opportunity.stipend,
      salary: opportunity.salary,
      match: opportunity.match,
      nextStep: 'Application submitted. Awaiting review.',
    };
    setApplications(prev => [newApp, ...prev]);
    return { success: true, message: 'Application submitted successfully!' };
  };

  const toggleSaveInternship = (id) => {
    setSavedInternships(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSaveJob = (id) => {
    setSavedJobs(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const saveAssessmentResults = (results) => {
    setAssessmentResults(results);
  };

  return (
    <AppContext.Provider value={{
      applications, applyToOpportunity,
      savedInternships, savedJobs, toggleSaveInternship, toggleSaveJob,
      notifications, markNotificationRead, markAllRead, unreadCount,
      assessmentResults, saveAssessmentResults,
      theme, setTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
