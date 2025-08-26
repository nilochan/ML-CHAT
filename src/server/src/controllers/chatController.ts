import { Request, Response } from 'express';
import Message from '../models/Message';
import ChatRoom from '../models/ChatRoom';
import { IUser } from '../models/User';

// Extend Express Request type to include user property
interface AuthRequest extends Request {
  user?: IUser;
}

// Send a message
export const sendMessage = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { content, roomId } = req.body;
    const sender = req.user?._id;

    if (!sender) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!content || content.trim() === '') {
      return res.status(400).json({ message: 'Message content is required' });
    }

    // Create new message
    const message = new Message({
      sender,
      content: content.trim(),
      room: roomId
    });

    await message.save();

    // Populate sender information
    await message.populate('sender', 'username email');

    return res.status(201).json(message);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get message history for a room
export const getMessages = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { roomId } = req.params;
    const { limit = 50, skip = 0 } = req.query;
    const user = req.user?._id;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // For direct messages, roomId might be a combination of user IDs
    // For group chats, roomId is the chat room ID
    
    let messages;
    
    if (roomId) {
      messages = await Message.find({ room: roomId })
        .populate('sender', 'username email')
        .sort({ timestamp: -1 })
        .limit(Number(limit))
        .skip(Number(skip));
    } else {
      // If no roomId, get all messages for the user (simplified)
      messages = await Message.find({ sender: user })
        .populate('sender', 'username email')
        .sort({ timestamp: -1 })
        .limit(Number(limit))
        .skip(Number(skip));
    }

    return res.json(messages);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Create a chat room
export const createChatRoom = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const { name, participants, isGroupChat = false } = req.body;
    const creator = req.user?._id;

    if (!creator) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Chat room name is required' });
    }

    if (!participants || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: 'Participants are required' });
    }

    // Ensure creator is in participants
    if (!participants.includes(creator.toString())) {
      participants.push(creator.toString());
    }

    // Create new chat room
    const chatRoom = new ChatRoom({
      name: name.trim(),
      participants,
      isGroupChat
    });

    await chatRoom.save();

    // Populate participants information
    await chatRoom.populate('participants', 'username email');

    return res.status(201).json(chatRoom);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get user's chat rooms
export const getUserChatRooms = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const user = req.user?._id;

    if (!user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const chatRooms = await ChatRoom.find({ participants: user })
      .populate('participants', 'username email');

    return res.json(chatRooms);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};