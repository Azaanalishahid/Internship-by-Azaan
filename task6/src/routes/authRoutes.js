import { Router } from 'express';
import { signUp, login, logout, refreshToken, getProfile } from '../controllers/authController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';

const router = Router();

// Public auth routes
router.post('/signup', signUp);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected auth routes
router.post('/logout', authenticateUser, logout);
router.get('/me', authenticateUser, getProfile);

export default router;
