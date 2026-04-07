import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PlusCircle, List, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const RecruiterDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-sora mb-2">Welcome, {user.name} 👋</h2>
          <p className="text-text-secondary">Manage your job postings and applicants efficiently</p>
        </div>
        
        {user.isApproved && (
          <Link to="/recruiter/post-job" className="bg-brand-primary text-white px-8 py-4 rounded-xl hover:bg-brand-primary-hover transition-all font-bold text-lg shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 self-start">
            <PlusCircle className="w-5 h-5" /> Post a New Job
          </Link>
        )}
      </div>

      {!user.isApproved ? (
        <div className="bg-brand-warning/10 border-2 border-brand-warning/20 rounded-3xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-brand-warning/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-warning">
            <Clock className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-bold mb-4 text-text-primary">Account Pending Approval</h3>
          <p className="text-text-secondary leading-relaxed">
            Your recruiter account is currently under review by our administrators. 
            Once approved, you'll be able to post jobs and manage applicants. 
            This process usually takes less than 24 hours.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
            <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-6">
              <PlusCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Create Job Postings</h3>
            <p className="text-text-secondary mb-8">Reach thousands of qualified candidates by posting your job openings.</p>
            <Link to="/recruiter/post-job" className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Post a Job now &rarr;
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
            <div className="w-14 h-14 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mb-6">
              <List className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Manage Listings</h3>
            <p className="text-text-secondary mb-8">Edit, close, or reactivate your existing job postings with ease.</p>
            <Link to="/recruiter/manage-jobs" className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              Manage jobs &rarr;
            </Link>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
            <div className="w-14 h-14 bg-brand-success/10 rounded-2xl flex items-center justify-center text-brand-success mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Track Applicants</h3>
            <p className="text-text-secondary mb-8">Review candidate profiles, change application statuses, and find the right fit.</p>
            <Link to="/recruiter/manage-jobs" className="text-brand-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
              View applicants &rarr;
            </Link>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
