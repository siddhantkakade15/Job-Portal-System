import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, Building, ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="bg-bg-base overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-sm font-medium border border-brand-primary/20 mb-8">
              ✦ Discover Your Dream Career
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary tracking-tight mb-8 font-sora">
              Connect with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Opportunities</span> That Matter
            </h1>
            <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
              Our platform brings together top talent and world-class companies. Whether you're seeking your next role or looking to hire, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup" className="w-full sm:w-auto bg-brand-primary text-white px-8 py-4 rounded-xl hover:bg-brand-primary-hover transition-all font-bold text-lg shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2">
                Get Started <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/login" className="w-full sm:w-auto bg-white text-text-primary border border-border-default px-8 py-4 rounded-xl hover:bg-bg-muted transition-all font-bold text-lg">
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/10 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 blur-[120px] rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white border-y border-border-default">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center p-8 rounded-3xl bg-bg-base border border-border-default hover:border-brand-primary/30 transition-all group">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Job Seekers</h3>
              <p className="text-text-secondary">Discover thousands of job opportunities from top companies worldwide. Apply with ease and track your progress.</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-bg-base border border-border-default hover:border-brand-primary/30 transition-all group">
              <div className="w-16 h-16 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">For Recruiters</h3>
              <p className="text-text-secondary">Post your job openings and connect with highly qualified candidates. Manage applications seamlessly in one place.</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-bg-base border border-border-default hover:border-brand-primary/30 transition-all group">
              <div className="w-16 h-16 bg-brand-success/10 rounded-2xl flex items-center justify-center text-brand-success mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Build Your Network</h3>
              <p className="text-text-secondary">Connect with industry professionals and grow your career through meaningful interactions and opportunities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
