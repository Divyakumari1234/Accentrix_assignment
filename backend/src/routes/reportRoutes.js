import express from 'express';
import { exportReportsCsv, listReports } from '../controllers/reportController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, authorize('admin'), listReports);
router.get('/export', protect, authorize('admin'), exportReportsCsv);

export default router;
