const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }

    if (req.user.role === 'recruiter' && !req.user.isApproved) {
      return res.status(403).json({
        message: 'Recruiter account not approved. Please wait for admin approval.',
      });
    }

    next();
  };
};

export default authorize;
