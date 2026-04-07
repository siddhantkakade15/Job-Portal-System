import { useState, useEffect } from 'react';
import { getAllUsers, getAllRecruiters } from '../../api/userAPI';
import { fetchAllJobs } from '../../api/jobAPI';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Building2, Briefcase, ShieldCheck, ArrowRight, Loader2, PieChart, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    recruiters: 0,
    jobs: 0,
    pendingRecruiters: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, recruitersRes, jobsRes] = await Promise.all([
          getAllUsers(),
          getAllRecruiters(),
          fetchAllJobs()
        ]);
        
        setStats({
          users: usersRes.data.length,
          recruiters: recruitersRes.data.length,
          jobs: jobsRes.data.length,
          pendingRecruiters: recruitersRes.data.filter(r => !r.isApproved).length
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading platform statistics...</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h2 className="text-3xl font-bold font-sora mb-2">Admin Control Center</h2>
        <p className="text-text-secondary">Monitor platform activity and manage system users</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
          <div className="w-12 h-12 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary mb-4">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Total Users</p>
          <h3 className="text-3xl font-bold text-text-primary">{stats.users}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
          <div className="w-12 h-12 bg-brand-secondary/10 rounded-2xl flex items-center justify-center text-brand-secondary mb-4">
            <Building2 className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Recruiters</p>
          <h3 className="text-3xl font-bold text-text-primary">{stats.recruiters}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5">
          <div className="w-12 h-12 bg-brand-success/10 rounded-2xl flex items-center justify-center text-brand-success mb-4">
            <Briefcase className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Active Jobs</p>
          <h3 className="text-3xl font-bold text-text-primary">{stats.jobs}</h3>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 border-l-4 border-l-brand-warning">
          <div className="w-12 h-12 bg-brand-warning/10 rounded-2xl flex items-center justify-center text-brand-warning mb-4">
            <Activity className="w-6 h-6" />
          </div>
          <p className="text-xs font-bold text-text-muted uppercase tracking-widest mb-1">Pending Approval</p>
          <h3 className="text-3xl font-bold text-text-primary">{stats.pendingRecruiters}</h3>
        </div>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-bg-base rounded-2xl flex items-center justify-center text-text-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
              <ShieldCheck className="w-8 h-8" />
            </div>
            {stats.pendingRecruiters > 0 && (
              <span className="bg-brand-warning text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse">
                {stats.pendingRecruiters} NEW REQUESTS
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold mb-3">Recruiter Management</h3>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Review and approve recruiter accounts to grant them job posting permissions. 
            Maintain platform quality by verifying business accounts.
          </p>
          <Link to="/admin/recruiters" className="inline-flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary transition-all">
            Manage Recruiters <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 group">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-bg-base rounded-2xl flex items-center justify-center text-text-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
              <Users className="w-8 h-8" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-3">User Directory</h3>
          <p className="text-text-secondary mb-8 leading-relaxed">
            Full oversight of all registered job seekers and administrators. 
            Monitor user growth and manage account security across the platform.
          </p>
          <Link to="/admin/users" className="inline-flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-primary transition-all">
            View All Users <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-8 rounded-3xl border border-border-default shadow-xl shadow-brand-primary/5 group md:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div className="w-14 h-14 bg-bg-base rounded-2xl flex items-center justify-center text-text-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
              <Briefcase className="w-8 h-8" />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-3">Platform Content Control</h3>
              <p className="text-text-secondary leading-relaxed">
                Oversee every job listing published on the portal. Remove inappropriate content, 
                resolve posting issues, and ensure all job data meets our community standards.
              </p>
            </div>
            <Link to="/admin/jobs" className="inline-flex items-center gap-2 border-2 border-text-primary text-text-primary px-8 py-3.5 rounded-xl font-bold hover:bg-text-primary hover:text-white transition-all whitespace-nowrap">
              Audit Job Listings <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
