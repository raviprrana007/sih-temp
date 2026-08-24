import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { ToastContainer } from './components/ui/Toast';

// Landing & Auth
import LandingPage from './pages/landing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

// Student
import StudentDashboard from './pages/student/StudentDashboard';
import StudentProfile from './pages/student/StudentProfile';
import SkillAssessment from './pages/student/SkillAssessment';
import SkillProfile from './pages/student/SkillProfile';
import SkillGapAnalysis from './pages/student/SkillGapAnalysis';
import InternshipsPage from './pages/student/InternshipsPage';
import JobsPage from './pages/student/JobsPage';
import ApplicationsPage from './pages/student/ApplicationsPage';
import LearningPage from './pages/student/LearningPage';
import DigitalPortfolio from './pages/student/DigitalPortfolio';
import MentorshipPage from './pages/student/MentorshipPage';

// Industry
import IndustryDashboard from './pages/industry/IndustryDashboard';
import CandidateDiscovery from './pages/industry/CandidateDiscovery';
import PostOpportunity from './pages/industry/PostOpportunity';

// Academician
import AcademicianDashboard from './pages/academician/AcademicianDashboard';

// Institution
import InstitutionDashboard from './pages/institution/InstitutionDashboard';

// Shared
import NotificationsPage from './pages/shared/NotificationsPage';
import SettingsPage from './pages/shared/SettingsPage';
import GenericPage from './pages/shared/GenericPage';

function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen bg-surface-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (requiredRole && user.role !== requiredRole) return <Navigate to={`/${user.role}`} replace />;
  return children;
}

function RoleRedirect() {
  const { user } = useAuth();
  if (user) return <Navigate to={`/${user.role}`} replace />;
  return <LandingPage />;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <ToastContainer />
          <Routes>
            {/* Public */}
            <Route path="/" element={<RoleRedirect />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Student */}
            <Route path="/student" element={<ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>} />
            <Route path="/student/profile" element={<ProtectedRoute requiredRole="student"><StudentProfile /></ProtectedRoute>} />
            <Route path="/student/assessment" element={<ProtectedRoute requiredRole="student"><SkillAssessment /></ProtectedRoute>} />
            <Route path="/student/skills" element={<ProtectedRoute requiredRole="student"><SkillProfile /></ProtectedRoute>} />
            <Route path="/student/skill-gap" element={<ProtectedRoute requiredRole="student"><SkillGapAnalysis /></ProtectedRoute>} />
            <Route path="/student/internships" element={<ProtectedRoute requiredRole="student"><InternshipsPage /></ProtectedRoute>} />
            <Route path="/student/jobs" element={<ProtectedRoute requiredRole="student"><JobsPage /></ProtectedRoute>} />
            <Route path="/student/applications" element={<ProtectedRoute requiredRole="student"><ApplicationsPage /></ProtectedRoute>} />
            <Route path="/student/learning" element={<ProtectedRoute requiredRole="student"><LearningPage /></ProtectedRoute>} />
            <Route path="/student/portfolio" element={<ProtectedRoute requiredRole="student"><DigitalPortfolio /></ProtectedRoute>} />
            <Route path="/student/mentorship" element={<ProtectedRoute requiredRole="student"><MentorshipPage /></ProtectedRoute>} />
            <Route path="/student/notifications" element={<ProtectedRoute requiredRole="student"><NotificationsPage /></ProtectedRoute>} />
            <Route path="/student/settings" element={<ProtectedRoute requiredRole="student"><SettingsPage /></ProtectedRoute>} />

            {/* Industry */}
            <Route path="/industry" element={<ProtectedRoute requiredRole="industry"><IndustryDashboard /></ProtectedRoute>} />
            <Route path="/industry/candidates" element={<ProtectedRoute requiredRole="industry"><CandidateDiscovery /></ProtectedRoute>} />
            <Route path="/industry/post-opportunity" element={<ProtectedRoute requiredRole="industry"><PostOpportunity /></ProtectedRoute>} />
            <Route path="/industry/profile" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Company Profile" description="Manage your company profile, culture, and employer branding." /></ProtectedRoute>} />
            <Route path="/industry/jobs" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Manage Postings" description="View, edit, and manage all active job and internship postings." /></ProtectedRoute>} />
            <Route path="/industry/applications" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Applications" description="Review and manage all candidate applications." /></ProtectedRoute>} />
            <Route path="/industry/mentorship" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Mentorship Programs" description="Set up and manage mentorship programs with students." /></ProtectedRoute>} />
            <Route path="/industry/workshops" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Workshops & Events" description="Publish workshops and training events for students." /></ProtectedRoute>} />
            <Route path="/industry/live-projects" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Live Projects" description="Post real industry projects for student participation." /></ProtectedRoute>} />
            <Route path="/industry/analytics" element={<ProtectedRoute requiredRole="industry"><GenericPage title="Recruitment Analytics" description="Analytics on your hiring funnel and candidate quality." /></ProtectedRoute>} />
            <Route path="/industry/notifications" element={<ProtectedRoute requiredRole="industry"><NotificationsPage /></ProtectedRoute>} />
            <Route path="/industry/settings" element={<ProtectedRoute requiredRole="industry"><SettingsPage /></ProtectedRoute>} />

            {/* Academician */}
            <Route path="/academician" element={<ProtectedRoute requiredRole="academician"><AcademicianDashboard /></ProtectedRoute>} />
            <Route path="/academician/profile" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Faculty Profile" description="Manage your academic profile, expertise, and publications." /></ProtectedRoute>} />
            <Route path="/academician/opportunities" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Faculty Internships" description="Browse industry internship programs for faculty." /></ProtectedRoute>} />
            <Route path="/academician/fdp" element={<ProtectedRoute requiredRole="academician"><GenericPage title="FDP Programs" description="Faculty Development Programs from top companies." /></ProtectedRoute>} />
            <Route path="/academician/workshops" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Workshops" description="Industry workshops and training for faculty." /></ProtectedRoute>} />
            <Route path="/academician/consultancy" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Consultancy Opportunities" description="Industry consultancy projects for faculty experts." /></ProtectedRoute>} />
            <Route path="/academician/research" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Research Collaboration" description="Industry-academia joint research opportunities." /></ProtectedRoute>} />
            <Route path="/academician/projects" element={<ProtectedRoute requiredRole="academician"><GenericPage title="Industry Projects" description="Live industry projects for faculty guidance." /></ProtectedRoute>} />
            <Route path="/academician/applications" element={<ProtectedRoute requiredRole="academician"><GenericPage title="My Applications" description="Track all your applications for FDPs and programs." /></ProtectedRoute>} />
            <Route path="/academician/notifications" element={<ProtectedRoute requiredRole="academician"><NotificationsPage /></ProtectedRoute>} />
            <Route path="/academician/settings" element={<ProtectedRoute requiredRole="academician"><SettingsPage /></ProtectedRoute>} />

            {/* Institution */}
            <Route path="/institution" element={<ProtectedRoute requiredRole="institution"><InstitutionDashboard /></ProtectedRoute>} />
            <Route path="/institution/students" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Student Management" description="Manage student profiles and track skill development." /></ProtectedRoute>} />
            <Route path="/institution/analytics" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Skill Analytics" description="Skill distribution and gap analysis across departments." /></ProtectedRoute>} />
            <Route path="/institution/placements" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Placement Analytics" description="Comprehensive placement data and year-on-year trends." /></ProtectedRoute>} />
            <Route path="/institution/internships" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Internship Analytics" description="Track internship participation and conversion rates." /></ProtectedRoute>} />
            <Route path="/institution/industry" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Industry Partners" description="Manage MoUs and industry engagement metrics." /></ProtectedRoute>} />
            <Route path="/institution/training" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Training Programs" description="Skill development programs for students and faculty." /></ProtectedRoute>} />
            <Route path="/institution/reports" element={<ProtectedRoute requiredRole="institution"><GenericPage title="Reports" description="Export comprehensive reports for NAAC and management." /></ProtectedRoute>} />
            <Route path="/institution/notifications" element={<ProtectedRoute requiredRole="institution"><NotificationsPage /></ProtectedRoute>} />
            <Route path="/institution/settings" element={<ProtectedRoute requiredRole="institution"><SettingsPage /></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
