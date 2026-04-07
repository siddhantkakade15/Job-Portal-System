import { useState, useEffect } from 'react';
import { fetchAllJobs, deleteJob } from '../../api/jobAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Building, MapPin, Trash2, Loader2, ChevronLeft, Search, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const { data } = await fetchAllJobs();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this job listing? This action is permanent.')) {
      setDeletingId(id);
      try {
        await deleteJob(id);
        setJobs(jobs.filter(j => j._id !== id));
      } catch (error) {
        alert('Failed to delete job.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    j.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading platform inventory...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-3xl font-bold font-sora mb-2 text-text-primary">Content Audit</h2>
          <p className="text-text-secondary">Monitor and manage all job listings across the platform</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search jobs or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-border-default rounded-xl focus:outline-none focus:border-brand-primary text-sm shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border-default overflow-hidden shadow-xl shadow-brand-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-base/50 border-b border-border-default">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Job Opportunity</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Location</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Posted Date</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <tr key={job._id} className="hover:bg-bg-base/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-text-muted">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{job.title}</p>
                          <p className="text-xs text-text-secondary flex items-center gap-1">
                            <Building className="w-3 h-3" /> {job.company}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-text-secondary flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-text-muted" />
                        {job.location}
                      </p>
                    </td>
                    <td className="px-8 py-6 text-sm text-text-secondary">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {deletingId === job._id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-brand-danger ml-auto" />
                      ) : (
                        <button 
                          onClick={() => handleDelete(job._id)}
                          className="p-2.5 text-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-xl transition-all"
                          title="Remove Listing"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-text-secondary">
                    No job listings found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 p-6 bg-brand-warning/5 border border-brand-warning/20 rounded-2xl flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-brand-warning flex-shrink-0" />
        <div>
          <h4 className="font-bold text-brand-warning text-sm">Administrator Notice</h4>
          <p className="text-xs text-text-secondary mt-1">
            As an administrator, you have the authority to remove any job listing that violates platform policies. 
            Deleting a job will also remove all associated applications. This action is irreversible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminManageJobsPage;
