import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/public/HomePage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';
import ProtectedRoute from './components/common/ProtectedRoute';

// Job Seeker
import JobSeekerDashboard from './pages/jobseeker/JobSeekerDashboard';
import JobDetailsPage from './pages/jobseeker/JobDetailsPage';
import AppliedJobsPage from './pages/jobseeker/AppliedJobsPage';

// Recruiter
import RecruiterDashboard from './pages/recruiter/RecruiterDashboard';
import PostJobPage from './pages/recruiter/PostJobPage';
import ManageJobsPage from './pages/recruiter/ManageJobsPage';
import ApplicantsListPage from './pages/recruiter/ApplicantsListPage';

// Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import ManageRecruitersPage from './pages/admin/ManageRecruitersPage';
import AdminManageJobsPage from './pages/admin/AdminManageJobsPage';

// Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Job Seeker Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['jobseeker']} />}>
            <Route path="/dashboard" element={<JobSeekerDashboard />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/applications" element={<AppliedJobsPage />} />
          </Route>

          {/* Recruiter Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/recruiter/post-job" element={<PostJobPage />} />
            <Route path="/recruiter/manage-jobs" element={<ManageJobsPage />} />
            <Route path="/recruiter/applicants/:id" element={<ApplicantsListPage />} />
          </Route>

          {/* Admin Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsersPage />} />
            <Route path="/admin/recruiters" element={<ManageRecruitersPage />} />
            <Route path="/admin/jobs" element={<AdminManageJobsPage />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
