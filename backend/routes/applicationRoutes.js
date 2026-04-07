import express from 'express';
import {
  applyForJob,
  getUserApplications,
  getJobApplicants,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/:jobId', protect, authorize('jobseeker'), applyForJob);
router.get('/user', protect, authorize('jobseeker'), getUserApplications);
router.get('/job/:jobId', protect, authorize('recruiter'), getJobApplicants);
router.put('/:id', protect, authorize('recruiter'), updateApplicationStatus);

export default router;
