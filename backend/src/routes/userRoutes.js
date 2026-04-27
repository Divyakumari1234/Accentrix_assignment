import express from 'express';
import {
  createUser,
  deleteUser,
  getUserSummary,
  listUsers,
  updateProfile,
  updateUser
} from '../controllers/userController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/summary', protect, getUserSummary);
router.put('/profile', protect, upload.single('avatar'), updateProfile);
router.route('/').get(protect, authorize('admin'), listUsers).post(protect, authorize('admin'), createUser);
router.route('/:id').put(protect, authorize('admin'), updateUser).delete(protect, authorize('admin'), deleteUser);

export default router;
