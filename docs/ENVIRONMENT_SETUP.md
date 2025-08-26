# Environment Setup Guide

This guide will help you set up the development environment for the ML-CHAT application.

## Prerequisites

1. Node.js (version 16 or higher)
2. npm (comes with Node.js) or yarn
3. Git
4. MongoDB (local installation or MongoDB Atlas account)
5. Code editor (VS Code recommended)

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/nilochan/ML-CHAT.git
cd ML-CHAT
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd src/server
npm init -y

# Install frontend dependencies
cd ../client
npm init -y
cd ../..
```

### 3. Install Required Packages

#### Backend Packages
```bash
# Express and TypeScript
npm install express
npm install -D typescript @types/node @types/express ts-node nodemon

# MongoDB
npm install mongoose
npm install -D @types/mongoose

# Authentication
npm install bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken

# Validation
npm install joi

# Environment variables
npm install dotenv

# Socket.IO for real-time communication
npm install socket.io
npm install -D @types/socket.io

# Development tools
npm install -D concurrently
```

#### Frontend Packages
```bash
# React and TypeScript
npm install react react-dom
npm install -D typescript @types/node @types/react @types/react-dom

# React scripts
npm install -D react-scripts

# Material-UI
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material

# Socket.IO client
npm install socket.io-client

# HTTP client
npm install axios

# Routing
npm install react-router-dom
npm install -D @types/react-router-dom
```

### 4. Configure TypeScript

#### Backend tsconfig.json
```bash
cd src/server
npx tsc --init
```

#### Frontend tsconfig.json
```bash
cd ../client
npx tsc --init
cd ../..
```

### 5. Set up MongoDB

1. Create a MongoDB Atlas account or install MongoDB locally
2. Create a new cluster
3. Create a new database user
4. Add your IP address to the whitelist (or allow access from anywhere for development)
5. Get your connection string

### 6. Environment Variables

Create a `.env` file in the `src/server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
```

### 7. Project Structure

After installation, your project structure should look like:

```
ML-CHAT/
├── src/
│   ├── client/
│   │   ├── node_modules/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── public/
│   │       └── index.html
│   └── server/
│       ├── node_modules/
│       ├── package.json
│       ├── tsconfig.json
│       └── .env
├── docs/
├── README.md
├── ...
```

### 8. Development Scripts

Add these scripts to your `package.json` files:

#### Backend (src/server/package.json)
```json
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc"
  }
}
```

#### Frontend (src/client/package.json)
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## Verification

To verify your setup:

1. Start MongoDB (if running locally)
2. Run the backend:
   ```bash
   cd src/server
   npm run dev
   ```
3. Run the frontend:
   ```bash
   cd src/client
   npm start
   ```

You should see the React welcome page at http://localhost:3000 and any backend messages in the terminal.

## Troubleshooting

1. **Port conflicts**: Change the PORT in .env
2. **MongoDB connection errors**: Verify your connection string
3. **TypeScript errors**: Check tsconfig.json settings
4. **Dependency issues**: Delete node_modules and package-lock.json, then run npm install again