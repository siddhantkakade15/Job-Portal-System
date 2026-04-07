import { motion } from 'framer-motion';
import { MapPin, Briefcase, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white p-6 rounded-2xl border border-border-default hover:border-brand-primary/40 hover:shadow-xl hover:shadow-brand-primary/5 transition-all group flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary text-xl font-bold">
          {job.company[0]}
        </div>
        <div className="bg-brand-success/10 text-brand-success text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
          New
        </div>
      </div>

      <div className="flex-grow">
        <h3 className="text-lg font-bold text-text-primary group-hover:text-brand-primary transition-colors mb-1 line-clamp-1">
          {job.title}
        </h3>
        <p className="text-sm text-text-secondary font-medium mb-4">{job.company}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-muted text-text-secondary text-xs">
            <MapPin className="w-3.5 h-3.5" /> {job.location}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-muted text-text-secondary text-xs">
            <DollarSign className="w-3.5 h-3.5" /> ${job.salary}
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-muted text-text-secondary text-xs">
            <Briefcase className="w-3.5 h-3.5" /> Full Time
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-default mt-auto">
        <div className="flex items-center gap-1 text-text-muted text-xs">
          <Calendar className="w-3.5 h-3.5" /> 
          {new Date(job.createdAt).toLocaleDateString()}
        </div>
        <Link 
          to={`/job/${job._id}`}
          className="flex items-center gap-1 text-brand-primary text-sm font-bold hover:gap-2 transition-all"
        >
          View Details <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
};

export default JobCard;
