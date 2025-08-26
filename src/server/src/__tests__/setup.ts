import mongoose from 'mongoose';

// Mock environment variables
process.env.JWT_SECRET = 'test_secret_key';
process.env.JWT_EXPIRE = '1h';