import express from 'express';
import { login, me, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, me);
router.post('/logout', protect, (_req, res) => res.json({ message: 'Logged out' }));

export default router;
