import { useState, useEffect } from 'react';
import { getUserApplications } from '../../api/applicationAPI';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Calendar, Clock, Loader2, Search } from 'lucide-react';

const AppliedJobsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const { data } = await getUserApplications();
        setApplications(data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'bg-brand-success/10 text-brand-success border-brand-success/20';
      case 'rejected': return 'bg-brand-danger/10 text-brand-danger border-brand-danger/20';
      default: return 'bg-brand-warning/10 text-brand-warning border-brand-warning/20';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-sora mb-2">My Applications</h2>
        <p className="text-text-secondary">Track the status of all your submitted job applications</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
          <p className="text-text-secondary font-medium">Loading your applications...</p>
        </div>
      ) : (
        <>
          {applications.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app, index) => (
                <motion.div
                  key={app._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-border-default hover:border-brand-primary/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-xl bg-bg-muted flex items-center justify-center text-text-muted text-2xl font-bold">
                      {app.jobId.company[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-text-primary mb-1">{app.jobId.title}</h3>
                      <p className="text-text-secondary font-medium mb-3">{app.jobId.company}</p>
                      <div className="flex flex-wrap gap-4 text-xs text-text-muted">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" /> {app.jobId.location}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5" /> ${app.jobId.salary}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" /> Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className={`px-4 py-2 rounded-full border text-sm font-bold uppercase tracking-wider text-center ${getStatusColor(app.status)}`}>
                      {app.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-border-default border-dashed">
              <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No applications yet</h3>
              <p className="text-text-secondary">Start applying for jobs to see them here.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AppliedJobsPage;
