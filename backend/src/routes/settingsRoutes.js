import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, authorize('admin'), getSettings).put(protect, authorize('admin'), updateSettings);

export default router;
