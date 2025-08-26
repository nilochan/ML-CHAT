import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('ML-CHAT Server is running!');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mlchat');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Start server (only if this file is run directly)
if (require.main === module) {
  const startServer = async () => {
    await connectDB();
    
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  };
  
  startServer();
}

export default app;