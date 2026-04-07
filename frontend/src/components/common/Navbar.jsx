import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Briefcase, Bell, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white border-b border-border-default sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Briefcase className="w-8 h-8 text-brand-primary" />
              <span className="text-xl font-bold font-sora tracking-tight">JobPortal</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {isAuthenticated ? (
              <>
                {user.role === 'jobseeker' && (
                  <>
                    <Link to="/dashboard" className="text-text-secondary hover:text-brand-primary font-medium">Browse Jobs</Link>
                    <Link to="/applications" className="text-text-secondary hover:text-brand-primary font-medium">My Applications</Link>
                  </>
                )}
                {user.role === 'recruiter' && (
                  <>
                    <Link to="/recruiter" className="text-text-secondary hover:text-brand-primary font-medium">Dashboard</Link>
                    <Link to="/recruiter/manage-jobs" className="text-text-secondary hover:text-brand-primary font-medium">My Jobs</Link>
                    <Link to="/recruiter/post-job" className="bg-brand-primary text-white px-4 py-2 rounded-lg hover:bg-brand-primary-hover transition-colors font-medium">Post a Job</Link>
                  </>
                )}
                {user.role === 'admin' && (
                  <>
                    <Link to="/admin" className="text-text-secondary hover:text-brand-primary font-medium">Admin Dashboard</Link>
                    <Link to="/admin/users" className="text-text-secondary hover:text-brand-primary font-medium">Manage Users</Link>
                  </>
                )}
                
                <div className="flex items-center gap-4 ml-4 pl-4 border-l border-border-default">
                  <button className="text-text-muted hover:text-brand-primary relative">
                    <Bell className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-brand-danger text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">0</span>
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold">
                      {user.name[0]}
                    </div>
                    <button onClick={logout} className="text-text-secondary hover:text-brand-danger transition-colors">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text-secondary hover:text-brand-primary font-medium">Login</Link>
                <Link to="/signup" className="bg-brand-primary text-white px-5 py-2.5 rounded-xl hover:bg-brand-primary-hover transition-all font-semibold shadow-lg shadow-brand-primary/20">Sign Up</Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-text-secondary">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-border-default px-4 pt-2 pb-6 space-y-2">
          {isAuthenticated ? (
            <>
              {user.role === 'jobseeker' && (
                <>
                  <Link to="/dashboard" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded-lg">Browse Jobs</Link>
                  <Link to="/applications" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded-lg">My Applications</Link>
                </>
              )}
              {user.role === 'recruiter' && (
                <>
                  <Link to="/recruiter" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded-lg">Dashboard</Link>
                  <Link to="/recruiter/manage-jobs" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded-lg">My Jobs</Link>
                  <Link to="/recruiter/post-job" className="block px-3 py-2 text-brand-primary font-medium">Post a Job</Link>
                </>
              )}
              <div className="pt-4 border-t border-border-default flex items-center justify-between">
                <span className="font-medium text-text-primary">{user.name}</span>
                <button onClick={logout} className="text-brand-danger flex items-center gap-2">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-4 pt-2">
              <Link to="/login" className="block px-3 py-2 text-text-secondary hover:bg-bg-muted rounded-lg">Login</Link>
              <Link to="/signup" className="block px-3 py-2 bg-brand-primary text-white text-center rounded-lg">Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
