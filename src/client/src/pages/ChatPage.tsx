import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import ChatWindow from '../components/ChatWindow';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // In a real app, you would clear the token from localStorage
    // localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ML-CHAT
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <ChatWindow />
    </Box>
  );
};

export default ChatPage;