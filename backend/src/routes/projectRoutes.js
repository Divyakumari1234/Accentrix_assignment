import express from 'express';
import { createProject, deleteProject, listProjects, updateProject } from '../controllers/projectController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin', 'client', 'user'), listProjects)
  .post(protect, authorize('admin'), createProject);

router
  .route('/:id')
  .put(protect, authorize('admin', 'client'), updateProject)
  .delete(protect, authorize('admin'), deleteProject);

export default router;
