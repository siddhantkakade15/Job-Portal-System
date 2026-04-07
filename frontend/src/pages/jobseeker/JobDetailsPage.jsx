import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchJobById } from '../../api/jobAPI';
import { applyForJob } from '../../api/applicationAPI';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Briefcase, Calendar, Building, ChevronLeft, Loader2, CheckCircle } from 'lucide-react';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const getJob = async () => {
      try {
        const { data } = await fetchJobById(id);
        setJob(data);
      } catch (err) {
        console.error('Error fetching job:', err);
        setError('Job not found or error fetching details.');
      } finally {
        setLoading(false);
      }
    };
    getJob();
  }, [id]);

  const handleApply = async () => {
    setApplying(true);
    try {
      await applyForJob(id);
      setApplied(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to apply for the job.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading job details...</p>
    </div>
  );

  if (error || !job) return (
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">{error}</h2>
      <button onClick={() => navigate(-1)} className="text-brand-primary font-bold hover:underline flex items-center justify-center gap-2 mx-auto">
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Jobs
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 overflow-hidden"
      >
        <div className="p-8 md:p-12 border-b border-border-default bg-bg-base/50">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-3xl font-bold flex-shrink-0">
                {job.company[0]}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 font-sora tracking-tight">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-text-secondary font-medium">
                  <div className="flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-brand-primary" /> {job.company}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-brand-primary" /> {job.location}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-shrink-0">
              {applied ? (
                <div className="flex items-center gap-2 px-6 py-3.5 bg-brand-success/10 text-brand-success rounded-xl font-bold">
                  <CheckCircle className="w-5 h-5" /> Already Applied
                </div>
              ) : (
                <button
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full md:w-auto bg-brand-primary text-white px-10 py-4 rounded-xl hover:bg-brand-primary-hover transition-all font-bold text-lg shadow-lg shadow-brand-primary/20 disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {applying ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Apply Now'}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white p-4 rounded-2xl border border-border-default">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Salary Range</p>
              <p className="text-text-primary font-bold flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-brand-primary" /> ${job.salary}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border-default">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Job Type</p>
              <p className="text-text-primary font-bold flex items-center gap-1">
                <Briefcase className="w-4 h-4 text-brand-primary" /> Full Time
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border-default">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Posted On</p>
              <p className="text-text-primary font-bold flex items-center gap-1">
                <Calendar className="w-4 h-4 text-brand-primary" /> {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-border-default">
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Applications</p>
              <p className="text-text-primary font-bold">Active</p>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6">About the Role</h2>
          <div className="prose prose-blue max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
            {job.description}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetailsPage;
