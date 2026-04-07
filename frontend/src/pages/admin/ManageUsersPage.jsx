import { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../../api/userAPI';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Trash2, Loader2, ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ManageUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const { data } = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setDeletingId(id);
      try {
        await deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        alert('Failed to delete user.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="w-10 h-10 text-brand-primary animate-spin mb-4" />
      <p className="text-text-secondary font-medium">Loading user directory...</p>
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
          <h2 className="text-3xl font-bold font-sora mb-2 text-text-primary">User Directory</h2>
          <p className="text-text-secondary">Manage platform members and their access levels</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            placeholder="Search by name or email..."
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
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">User</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Role</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider">Joined</th>
                <th className="px-8 py-5 text-xs font-bold text-text-muted uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-default">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-bg-base/30 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-bg-muted flex items-center justify-center text-text-muted font-bold">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-text-primary">{user.name}</p>
                          <p className="text-xs text-text-secondary">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                        user.role === 'admin' ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' :
                        user.role === 'recruiter' ? 'bg-brand-secondary/10 text-brand-secondary border-brand-secondary/20' :
                        'bg-bg-muted text-text-secondary border-border-default'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-text-secondary">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-6 text-right">
                      {user.role !== 'admin' && (
                        deletingId === user._id ? (
                          <Loader2 className="w-5 h-5 animate-spin text-brand-danger ml-auto" />
                        ) : (
                          <button 
                            onClick={() => handleDelete(user._id)}
                            className="p-2.5 text-text-muted hover:text-brand-danger hover:bg-brand-danger/10 rounded-xl transition-all"
                            title="Delete User"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-8 py-12 text-center text-text-secondary">
                    No users found matching your search.
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

export default ManageUsersPage;
