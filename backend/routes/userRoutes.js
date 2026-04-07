import express from 'express';
import {
  getAllUsers,
  deleteUser,
  getAllRecruiters,
  approveRecruiter,
  removeRecruiter,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import authorize from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/', getAllUsers);
router.delete('/:id', deleteUser);
router.get('/recruiters', getAllRecruiters);
router.put('/recruiters/:id/approve', approveRecruiter);
router.delete('/recruiters/:id', removeRecruiter);

export default router;
