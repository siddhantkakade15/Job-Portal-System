import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createJob } from '../../api/jobAPI';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, FileText, Building, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';

const PostJobPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createJob(formData);
      setIsSuccess(true);
      setTimeout(() => navigate('/recruiter/manage-jobs'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job. Please try again.');
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="w-20 h-20 bg-brand-success/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-success">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Job Posted Successfully!</h2>
          <p className="text-text-secondary">Redirecting you to your job listings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium mb-8 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </button>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
        <div className="mb-10">
          <h2 className="text-3xl font-bold font-sora mb-2 text-text-primary">Post a New Job</h2>
          <p className="text-text-secondary">Find the best talent for your company today</p>
        </div>

        {error && (
          <div className="mb-8 p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/20 text-brand-danger flex items-center gap-3 text-sm">
            <FileText className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Job Title</label>
            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Software Engineer, Product Designer, etc."
                className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Company Name</label>
              <div className="relative">
                <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="ACME Inc."
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Remote, NYC, London..."
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Salary Range (Monthly/Yearly)</label>
            <div className="relative">
              <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
              <input
                type="text"
                name="salary"
                required
                value={formData.salary}
                onChange={handleChange}
                placeholder="e.g., 5000 - 8000"
                className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Job Description</label>
            <div className="relative">
              <textarea
                name="description"
                required
                rows="8"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the roles, responsibilities, and requirements..."
                className="w-full px-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all resize-none"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand-primary text-white py-4 rounded-xl hover:bg-brand-primary-hover transition-all font-bold text-lg shadow-lg shadow-brand-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Publish Job Opportunity'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
