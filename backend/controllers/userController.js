import User from '../models/User.js';

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).select('-password').sort({ createdAt: -1 });
  res.json(users);
};

// @desc    Delete a user
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// @desc    Get all recruiters
// @route   GET /api/users/recruiters
// @access  Private/Admin
export const getAllRecruiters = async (req, res) => {
  const recruiters = await User.find({ role: 'recruiter' })
    .select('-password')
    .sort({ createdAt: -1 });
  res.json(recruiters);
};

// @desc    Approve a recruiter
// @route   PUT /api/users/recruiters/:id/approve
// @access  Private/Admin
export const approveRecruiter = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && user.role === 'recruiter') {
    user.isApproved = true;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Recruiter not found' });
  }
};

// @desc    Remove a recruiter (disapprove)
// @route   DELETE /api/users/recruiters/:id
// @access  Private/Admin
export const removeRecruiter = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user && user.role === 'recruiter') {
    user.isApproved = false;
    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'Recruiter not found' });
  }
};
