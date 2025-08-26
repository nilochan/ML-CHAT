import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          ML-CHAT
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Simple Authentication Chat System
        </Typography>
        <Typography variant="body1" gutterBottom>
          Welcome to the chat application for Singapore and Malaysia users.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/login')}
            sx={{ mr: 2 }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;