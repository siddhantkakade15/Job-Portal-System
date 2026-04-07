import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../api/authAPI';
import { motion } from 'framer-motion';
import { Briefcase, Mail, Lock, User, Eye, EyeOff, AlertCircle, Loader2, CheckCircle2, Building2, Search } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'jobseeker'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await registerUser(formData);
      navigate('/login', { state: { message: 'Account created successfully! Please sign in.' } });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full"
      >
        <div className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Briefcase className="w-10 h-10 text-brand-primary" />
              <span className="text-2xl font-bold font-sora">JobPortal</span>
            </Link>
            <h2 className="text-3xl font-bold text-text-primary">Create Account</h2>
            <p className="text-text-secondary mt-2">Join thousands of people finding their dream career</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-brand-danger/10 border border-brand-danger/20 text-brand-danger flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect('jobseeker')}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 ${
                  formData.role === 'jobseeker' 
                  ? 'border-brand-primary bg-brand-primary/5 ring-4 ring-brand-primary/10' 
                  : 'border-border-default hover:border-brand-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.role === 'jobseeker' ? 'bg-brand-primary text-white' : 'bg-bg-muted text-text-secondary'}`}>
                  <Search className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Job Seeker</h4>
                  <p className="text-[10px] text-text-secondary mt-1">Finding a role</p>
                </div>
                {formData.role === 'jobseeker' && <CheckCircle2 className="w-5 h-5 text-brand-primary absolute top-4 right-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('recruiter')}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 ${
                  formData.role === 'recruiter' 
                  ? 'border-brand-primary bg-brand-primary/5 ring-4 ring-brand-primary/10' 
                  : 'border-border-default hover:border-brand-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.role === 'recruiter' ? 'bg-brand-primary text-white' : 'bg-bg-muted text-text-secondary'}`}>
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Recruiter</h4>
                  <p className="text-[10px] text-text-secondary mt-1">Hiring talent</p>
                </div>
                {formData.role === 'recruiter' && <CheckCircle2 className="w-5 h-5 text-brand-primary absolute top-4 right-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('admin')}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex flex-col gap-3 ${
                  formData.role === 'admin' 
                  ? 'border-brand-primary bg-brand-primary/5 ring-4 ring-brand-primary/10' 
                  : 'border-border-default hover:border-brand-primary/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.role === 'admin' ? 'bg-brand-primary text-white' : 'bg-bg-muted text-text-secondary'}`}>
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs">Admin</h4>
                  <p className="text-[10px] text-text-secondary mt-1">System control</p>
                </div>
                {formData.role === 'admin' && <CheckCircle2 className="w-5 h-5 text-brand-primary absolute top-4 right-4" />}
              </button>
            </div>

            {formData.role === 'recruiter' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-4 rounded-xl bg-brand-secondary/10 border border-brand-secondary/20 text-brand-secondary flex gap-3 text-xs leading-relaxed"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                Recruiter accounts require admin approval before you can post jobs. You will be able to browse but not post until approved.
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-bg-base border border-border-default rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-primary text-white py-4 rounded-xl hover:bg-brand-primary-hover transition-all font-bold text-lg shadow-lg shadow-brand-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-border-default text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-primary font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
