import Application from '../models/Application.js';
import Job from '../models/Job.js';
import sendNotification from '../utils/sendNotification.js';

// @desc    Apply for a job
// @route   POST /api/apply/:jobId
// @access  Private/JobSeeker
export const applyForJob = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  const alreadyApplied = await Application.findOne({
    userId: req.user._id,
    jobId,
  });

  if (alreadyApplied) {
    return res.status(400).json({ message: 'Already applied for this job' });
  }

  const application = await Application.create({
    userId: req.user._id,
    jobId,
  });

  if (application) {
    // Send notification to recruiter
    await sendNotification(
      job.recruiterId,
      `New application for your job: ${job.title}`
    );

    res.status(201).json(application);
  } else {
    res.status(400).json({ message: 'Invalid application data' });
  }
};

// @desc    Get user's applications
// @route   GET /api/applications/user
// @access  Private/JobSeeker
export const getUserApplications = async (req, res) => {
  const applications = await Application.find({ userId: req.user._id })
    .populate('jobId')
    .sort({ createdAt: -1 });

  res.json(applications);
};

// @desc    Get applicants for a job
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
export const getJobApplicants = async (req, res) => {
  const { jobId } = req.params;

  const job = await Job.findById(jobId);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  if (job.recruiterId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const applicants = await Application.find({ jobId })
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  res.json(applicants);
};

// @desc    Update application status
// @route   PUT /api/applications/:id
// @access  Private/Recruiter
export const updateApplicationStatus = async (req, res) => {
  const { status } = req.body;
  const application = await Application.findById(req.params.id).populate('jobId');

  if (application) {
    if (application.jobId.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = status || application.status;
    const updatedApplication = await application.save();

    // Send notification to job seeker
    await sendNotification(
      application.userId,
      `Your application for ${application.jobId.title} has been ${status}`
    );

    res.json(updatedApplication);
  } else {
    res.status(404).json({ message: 'Application not found' });
  }
};
