import { useState, useEffect } from 'react';
import { fetchAllJobs } from '../../api/jobAPI';
import JobCard from '../../components/jobseeker/JobCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, DollarSign, Filter, Loader2, X } from 'lucide-react';

const JobSeekerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    location: '',
    minSalary: '',
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await fetchAllJobs(filters);
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ title: '', location: '', minSalary: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-sora mb-2">Find Your Next Role</h2>
        <p className="text-text-secondary">Discover thousands of opportunities that match your skills</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2 ml-1">Job Title</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                placeholder="Search by role..."
                className="w-full pl-10 pr-4 py-3 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:border-brand-primary text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2 ml-1">Location</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="Anywhere..."
                className="w-full pl-10 pr-4 py-3 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:border-brand-primary text-sm"
              />
            </div>
          </div>
          <div className="relative">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2 ml-1">Min Salary</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="number"
                name="minSalary"
                value={filters.minSalary}
                onChange={handleFilterChange}
                placeholder="0"
                className="w-full pl-10 pr-4 py-3 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:border-brand-primary text-sm"
              />
            </div>
          </div>
          <button 
            onClick={clearFilters}
            className="h-[46px] flex items-center justify-center gap-2 text-text-secondary hover:text-brand-primary transition-colors font-medium text-sm"
          >
            <X className="w-4 h-4" /> Clear Filters
          </button>
        </div>
      </div>

      {/* Jobs Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24">
          <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
          <p className="text-text-secondary font-medium">Loading opportunities...</p>
        </div>
      ) : (
        <>
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    <JobCard job={job} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border border-border-default border-dashed">
              <div className="w-16 h-16 bg-bg-muted rounded-full flex items-center justify-center mx-auto mb-6 text-text-muted">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No jobs found</h3>
              <p className="text-text-secondary">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
