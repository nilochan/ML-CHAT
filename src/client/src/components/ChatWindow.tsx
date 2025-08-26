import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Button, List, ListItem, Typography, Paper } from '@mui/material';
import { io, Socket } from 'socket.io-client';

// Define types for our chat messages
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for incoming messages
    newSocket.on('receiveMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up on component unmount
    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '' || !socket) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You', // In a real app, this would be the authenticated user
      content: newMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    // Send message through Socket.IO
    socket.emit('sendMessage', message);

    // Add to local messages (will be replaced by server response in real app)
    setMessages(prevMessages => [...prevMessages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Typography variant="h4" component="h1" sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        ML-CHAT
      </Typography>
      
      <Paper elevation={3} sx={{ flex: 1, m: 2, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ justifyContent: message.sender === 'You' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{ maxWidth: '70%', bgcolor: message.sender === 'You' ? 'primary.light' : 'grey.200', p: 2, borderRadius: 2 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {message.sender}
                  </Typography>
                  <Typography variant="body1">
                    {message.content}
                  </Typography>
                  <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 1 }}>
                    {message.timestamp}
                  </Typography>
                </Box>
              </ListItem>
            ))}
            <div ref={messagesEndRef} />
          </List>
        </Box>
        
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatWindow;