import { useState, useEffect } from 'react';
import { fetchRecruiterJobs, deleteJob } from '../../api/jobAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Users, Edit3, Trash2, Loader2, Search, Plus } from 'lucide-react';

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const getJobs = async () => {
    try {
      const { data } = await fetchRecruiterJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching recruiter jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing?')) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(job => job._id !== id));
      } catch (error) {
        alert('Failed to delete job.');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold font-sora mb-2">Manage Job Listings</h2>
          <p className="text-text-secondary">Track performance and manage applicants for your postings</p>
        </div>
        <Link to="/recruiter/post-job" className="bg-brand-primary text-white px-6 py-3 rounded-xl hover:bg-brand-primary-hover transition-all font-bold flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" /> Post Another Job
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
          <p className="text-text-secondary font-medium">Loading your listings...</p>
        </div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white p-6 rounded-2xl border border-border-default hover:border-brand-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-2xl font-bold">
                        {job.company[0]}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-4 text-xs text-text-muted font-medium uppercase tracking-wider">
                          <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                          <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> Full Time</span>
                          <span className="text-brand-primary">Posted on {new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Link 
                        to={`/recruiter/applicants/${job._id}`}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-secondary/10 text-brand-secondary rounded-xl font-bold hover:bg-brand-secondary/20 transition-all text-sm"
                      >
                        <Users className="w-4 h-4" /> View Applicants
                      </Link>
                      <button 
                        onClick={() => handleDelete(job._id)}
                        className="p-2.5 text-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-xl transition-all"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-border-default border-dashed">
              <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No jobs posted yet</h3>
              <p className="text-text-secondary mb-8">Ready to find your next great hire?</p>
              <Link to="/recruiter/post-job" className="bg-brand-primary text-white px-8 py-3 rounded-xl font-bold">
                Post Your First Job
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageJobsPage;
