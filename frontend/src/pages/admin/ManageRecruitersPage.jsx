import { useState, useEffect } from 'react';
import { getAllRecruiters, approveRecruiter, removeRecruiter } from '../../api/userAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Building2, Mail, Calendar, Loader2, ChevronLeft, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageRecruitersPage = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const navigate = useNavigate();

  const fetchRecruiters = async () => {
    try {
      const { data } = await getAllRecruiters();
      setRecruiters(data);
    } catch (error) {
      console.error('Error fetching recruiters:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const handleApprove = async (id) => {
    setActionId(id);
    try {
      await approveRecruiter(id);
      setRecruiters(recruiters.map(r => r._id === id ? { ...r, isApproved: true } : r));
    } catch (error) {
      alert('Failed to approve recruiter.');
    } finally {
      setActionId(null);
    }
  };

  const handleRemove = async (id) => {
    if (window.confirm('Are you sure you want to remove approval for this recruiter?')) {
      setActionId(id);
      try {
        await removeRecruiter(id);
        setRecruiters(recruiters.map(r => r._id === id ? { ...r, isApproved: false } : r));
      } catch (error) {
        alert('Failed to remove recruiter.');
      } finally {
        setActionId(null);
      }
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading recruiter directory...</p>
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

      <div className="mb-12">
        <h2 className="text-3xl font-bold font-sora mb-2 text-text-primary">Recruiter Management</h2>
        <p className="text-text-secondary">Approve or manage access for recruiter accounts</p>
      </div>

      <div className="bg-white rounded-3xl border border-border-default overflow-hidden shadow-xl shadow-brand-primary/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-base/50 border-b border-border-default">
              <tr>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Recruiter</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Joined On</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {recruiters.length > 0 ? (
                recruiters.map((recruiter) => (
                  <tr key={recruiter._id} className="hover:bg-bg-base/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${recruiter.isApproved ? 'bg-brand-success/10 text-brand-success' : 'bg-brand-warning/10 text-brand-warning'}`}>
                          {recruiter.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{recruiter.name}</p>
                          <p className="text-sm text-text-secondary flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" /> {recruiter.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-text-muted" />
                        {new Date(recruiter.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      {recruiter.isApproved ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-success/10 text-brand-success text-[10px] font-bold uppercase tracking-wider border border-brand-success/20">
                          <ShieldCheck className="w-3.5 h-3.5" /> Approved
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-warning/10 text-brand-warning text-[10px] font-bold uppercase tracking-wider border border-brand-warning/20">
                          <ShieldAlert className="w-3.5 h-3.5" /> Pending
                        </span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {actionId === recruiter._id ? (
                        <Loader2 className="w-5 h-5 animate-spin text-brand-primary ml-auto" />
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          {!recruiter.isApproved ? (
                            <button 
                              onClick={() => handleApprove(recruiter._id)}
                              className="px-4 py-2 bg-brand-primary text-white rounded-xl font-bold text-xs hover:bg-brand-primary-hover transition-all flex items-center gap-2"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleRemove(recruiter._id)}
                              className="px-4 py-2 border border-border-default text-text-secondary rounded-xl font-bold text-xs hover:bg-brand-danger/10 hover:text-brand-danger hover:border-brand-danger/20 transition-all flex items-center gap-2"
                            >
                              <X className="w-4 h-4" /> Revoke
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-text-secondary">
                    No recruiters found in the directory.
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

export default ManageRecruitersPage;
