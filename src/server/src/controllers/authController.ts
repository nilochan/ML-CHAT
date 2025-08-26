import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import * as Joi from 'joi';

// Extend Express Request type to include user property
interface AuthRequest extends Request {
  user?: IUser;
}

// Generate JWT Token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';
  return jwt.sign({ userId }, secret, { expiresIn });
};

// Register User
export const register = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate input
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    });
    
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const { username, email, password } = value;
    
    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User with this email or username already exists' 
      });
    }
    
    // Create user
    const user: IUser = new User({
      username,
      email,
      password
    });
    
    await user.save();
    
    // Generate token
    const token = generateToken(user._id.toString());
    
    // Return user data (without password) and token
    return res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Login User
export const login = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate input
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    });
    
    const { error, value } = schema.validate(req.body);
    
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    
    const { email, password } = value;
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id.toString());
    
    // Return user data (without password) and token
    return res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get User Profile
export const getProfile = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    // req.user is added by auth middleware
    const user = req.user;
    
    return res.json({
      _id: user?._id,
      username: user?.username,
      email: user?.email
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};