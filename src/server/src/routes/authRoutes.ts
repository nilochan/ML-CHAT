import { Router } from 'express';
import { register, login, getProfile } from '../controllers/authController';
import auth from '../middleware/auth';

const router = Router();

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Get user profile (protected route)
router.get('/profile', auth, getProfile);

export default router;