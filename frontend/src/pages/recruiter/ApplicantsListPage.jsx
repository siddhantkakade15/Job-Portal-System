import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJobApplicants, updateApplicationStatus } from '../../api/applicationAPI';
import { fetchJobById } from '../../api/jobAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Calendar, Check, X, Loader2, ChevronLeft, Briefcase, ExternalLink } from 'lucide-react';

const ApplicantsListPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobRes, applicantsRes] = await Promise.all([
          fetchJobById(id),
          getJobApplicants(id)
        ]);
        setJob(jobRes.data);
        setApplicants(applicantsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleStatusChange = async (appId, status) => {
    setUpdatingId(appId);
    try {
      await updateApplicationStatus(appId, status);
      setApplicants(applicants.map(app => 
        app._id === appId ? { ...app, status } : app
      ));
    } catch (error) {
      alert('Failed to update status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'accepted': return 'bg-brand-success/10 text-brand-success border-brand-success/20';
      case 'rejected': return 'bg-brand-danger/10 text-brand-danger border-brand-danger/20';
      default: return 'bg-brand-warning/10 text-brand-warning border-brand-warning/20';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading applicants...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium mb-8 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" /> Back to Jobs
      </button>

      <div className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
              <Briefcase className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Applicants for</p>
              <h2 className="text-2xl font-bold text-text-primary">{job?.title}</h2>
            </div>
          </div>
          <div className="bg-bg-base px-6 py-3 rounded-2xl border border-border-default flex items-center gap-6">
            <div className="text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase mb-0.5">Total</p>
              <p className="text-xl font-bold text-text-primary">{applicants.length}</p>
            </div>
            <div className="w-px h-8 bg-border-default"></div>
            <div className="text-center">
              <p className="text-[10px] font-bold text-text-muted uppercase mb-0.5">Pending</p>
              <p className="text-xl font-bold text-brand-warning">{applicants.filter(a => a.status === 'pending').length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-border-default overflow-hidden shadow-xl shadow-brand-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-base/50 border-b border-border-default">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Candidate</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Applied On</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {applicants.length > 0 ? (
                applicants.map((app) => (
                  <tr key={app._id} className="hover:bg-bg-base/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                          {app.userId.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{app.userId.name}</p>
                          <p className="text-xs text-text-secondary flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {app.userId.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm text-text-secondary flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {updatingId === app._id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-brand-primary ml-auto" />
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          {app.status === 'pending' && (
                            <>
                              <button 
                                onClick={() => handleStatusChange(app._id, 'accepted')}
                                className="p-2 bg-brand-success/10 text-brand-success rounded-lg hover:bg-brand-success hover:text-white transition-all"
                                title="Accept Applicant"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleStatusChange(app._id, 'rejected')}
                                className="p-2 bg-brand-danger/10 text-brand-danger rounded-lg hover:bg-brand-danger hover:text-white transition-all"
                                title="Reject Applicant"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button className="p-2 text-text-muted hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all">
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-text-secondary">
                    No applicants yet for this job listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantsListPage;
