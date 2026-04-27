import express from 'express';
import { createClient, deleteClient, listClients, updateClient } from '../controllers/clientController.js';
import { authorize, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(protect, authorize('admin'), listClients)
  .post(protect, authorize('admin'), createClient);

router
  .route('/:id')
  .put(protect, authorize('admin'), updateClient)
  .delete(protect, authorize('admin'), deleteClient);

export default router;
