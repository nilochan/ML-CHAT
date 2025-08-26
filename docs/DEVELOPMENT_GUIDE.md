# Development Guide

This guide will help you run and develop the ML-CHAT application.

## Prerequisites

1. Node.js (version 16 or higher)
2. MongoDB (local installation or MongoDB Atlas account)
3. Git

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/nilochan/ML-CHAT.git
cd ML-CHAT
```

### 2. Install Dependencies

Install server dependencies:
```bash
cd src/server
npm install
cd ../..
```

Install client dependencies:
```bash
cd src/client
npm install
cd ../..
```

### 3. Configure Environment Variables

Create a `.env` file in `src/server/`:
```bash
cd src/server
cp .env.example .env
```

Edit the `.env` file to match your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mlchat
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=7d
```

### 4. Start MongoDB

If using local MongoDB, start the service:
- Windows: Start the MongoDB service from Services
- macOS: `brew services start mongodb-community@7.0`
- Linux: `sudo systemctl start mongod`

### 5. Run the Application

#### Run Server Only

```bash
cd src/server
npm run dev
```

The server will start on http://localhost:5000

#### Run Client Only

```bash
cd src/client
npm start
```

The client will start on http://localhost:3000

#### Run Both Server and Client

You can use concurrently to run both:
```bash
cd src/server
npm install -g concurrently
concurrently "npm run dev" "cd ../client && npm start"
```

Or run them in separate terminals:
1. Terminal 1:
   ```bash
   cd src/server
   npm run dev
   ```

2. Terminal 2:
   ```bash
   cd src/client
   npm start
   ```

## Testing

Run the authentication tests:
```bash
cd src/server
npm test
```

Run tests in watch mode:
```bash
cd src/server
npm run test:watch
```

## Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

4. Push to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a pull request on GitHub

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login existing user
- `GET /api/auth/profile` - Get user profile (protected)

## Folder Structure

```
ML-CHAT/
├── docs/                 # Documentation
├── src/
│   ├── client/           # React frontend
│   │   ├── public/       # Public assets
│   │   └── src/          # Source code
│   │       ├── components/  # React components
│   │       ├── pages/       # Page components
│   │       ├── services/    # API services
│   │       ├── App.tsx      # Main App component
│   │       └── index.tsx    # Entry point
│   └── server/           # Express backend
│       ├── src/          # Source code
│       │   ├── controllers/  # Route controllers
│       │   ├── middleware/   # Express middleware
│       │   ├── models/       # Mongoose models
│       │   ├── routes/       # API routes
│       │   └── index.ts      # Entry point
│       ├── .env              # Environment variables
│       ├── .env.example      # Example environment variables
│       ├── package.json      # Server dependencies
│       └── tsconfig.json     # TypeScript configuration
├── README.md             # Project overview
└── ...
```

## Troubleshooting

### Common Issues

1. **Port already in use**: Change the PORT in `.env`
2. **MongoDB connection error**: Verify MongoDB is running and connection string is correct
3. **TypeScript compilation errors**: Check tsconfig.json settings
4. **Dependency issues**: Delete node_modules and package-lock.json, then run npm install again

### Getting Help

- Check the documentation in the `docs/` folder
- Review the code comments
- Open an issue on GitHub if you find a bug