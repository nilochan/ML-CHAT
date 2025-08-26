import { Router } from 'express';
import { 
  sendMessage, 
  getMessages, 
  createChatRoom, 
  getUserChatRooms 
} from '../controllers/chatController';
import auth from '../middleware/auth';

const router = Router();

// Apply auth middleware to all routes
router.use(auth);

// Message routes
router.post('/messages', sendMessage);
router.get('/messages/:roomId', getMessages);

// Chat room routes
router.post('/rooms', createChatRoom);
router.get('/rooms', getUserChatRooms);

export default router;