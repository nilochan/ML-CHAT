import mongoose from 'mongoose';

// Set default timeout for tests
jest.setTimeout(30000);

// Mock environment variables
process.env.JWT_SECRET = 'test_secret_key';
process.env.JWT_EXPIRE = '1h';