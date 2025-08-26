# System Architecture for ML-CHAT

## High-Level Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌──────────────────┐
│   Web Client    │    │   Mobile App     │    │   Admin Panel    │
└─────────┬───────┘    └────────┬─────────┘    └────────┬─────────┘
          │                     │                       │
          └─────────────────────┼───────────────────────┘
                                │
                    ┌───────────▼──────────┐
                    │                      │
                    │   API Gateway        │
                    │   (Express.js)       │
                    │                      │
                    └─────┬──────────┬─────┘
                          │          │
                ┌─────────▼──┐   ┌───▼─────────┐
                │            │   │             │
                │ Auth       │   │ Chat        │
                │ Service    │   │ Service     │
                │            │   │             │
                └─────────┬──┘   └───┬─────────┘
                          │          │
                    ┌─────▼──────────▼─────┐
                    │                      │
                    │   Database           │
                    │   (MongoDB)          │
                    │                      │
                    └──────────────────────┘
```

## Component Details

### 1. Client Applications

#### Web Client
- Built with React.js and TypeScript
- Uses Material-UI for components
- Real-time communication via Socket.IO
- JWT authentication with HttpOnly cookies
- Responsive design for all device sizes

#### Mobile App (Future Enhancement)
- React Native for cross-platform development
- Shared components with web client where possible
- Native device features integration (notifications, camera)

### 2. Backend Services

#### API Gateway (Express.js)
- Routes requests to appropriate services
- Handles CORS, rate limiting, and security middleware
- Request/response validation
- Error handling and logging

#### Authentication Service
- User registration and login
- JWT token generation and validation
- Password hashing with bcrypt
- Session management with refresh tokens
- Two-factor authentication (future enhancement)

#### Chat Service
- Real-time messaging with Socket.IO
- Message persistence in MongoDB
- Room/Group chat management
- Message history retrieval
- Typing indicators and presence status

### 3. Data Layer

#### MongoDB Database
- User collection (user authentication data)
- Message collection (chat messages)
- Room collection (chat rooms/groups)
- Session collection (active user sessions)

### 4. External Services

#### Railway Deployment
- Containerized application deployment
- Automatic SSL certificate management
- Environment variable configuration
- Database hosting (MongoDB)

## Data Flow

1. **User Registration**
   - Client sends registration request to Auth Service
   - Auth Service validates input and hashes password
   - User data stored in MongoDB
   - JWT tokens generated and returned to client

2. **User Login**
   - Client sends credentials to Auth Service
   - Auth Service validates credentials
   - JWT tokens generated and returned to client
   - Client stores tokens in HttpOnly cookies

3. **Chat Messaging**
   - Client connects to Socket.IO server with JWT token
   - Server validates token and establishes connection
   - Messages sent through Socket.IO channels
   - Messages stored in MongoDB
   - Messages broadcast to relevant users/rooms

## Security Considerations

- All communication over HTTPS
- JWT tokens with short expiration times
- Refresh tokens for seamless user experience
- Input validation and sanitization
- Protection against common web vulnerabilities (XSS, CSRF, etc.)
- Rate limiting for API endpoints
- Secure password storage with bcrypt

## Scalability Considerations

- Stateless services for horizontal scaling
- Database indexing for performance
- Message pagination for large conversations
- Load balancing capabilities
- Caching strategies for frequently accessed data