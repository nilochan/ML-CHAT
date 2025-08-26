# MongoDB Setup Guide

This guide will help you set up MongoDB for local development and testing.

## Option 1: Local MongoDB Installation

### Windows

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Run the installer and follow the setup wizard
3. Choose "Complete" setup type
4. Select "Run service as Network Service user"
5. Choose installation directory (default is fine)
6. Install MongoDB Compass (optional but recommended)
7. Complete the installation

### macOS

1. Install Homebrew if you don't have it:
   ```
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. Install MongoDB:
   ```
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   ```

3. Start MongoDB service:
   ```
   brew services start mongodb-community@7.0
   ```

### Linux (Ubuntu)

1. Import the MongoDB public GPG key:
   ```
   wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
   ```

2. Create a list file for MongoDB:
   ```
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
   ```

3. Reload local package database:
   ```
   sudo apt-get update
   ```

4. Install MongoDB packages:
   ```
   sudo apt-get install -y mongodb-org
   ```

5. Start MongoDB:
   ```
   sudo systemctl start mongod
   ```

## Option 2: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (M0 Sandbox is free)
4. Select AWS, GCP, or Azure as provider
5. Choose a region near you
6. Create cluster (takes a few minutes)
7. Once created, click "Connect"
8. Select "Connect your application"
9. Copy the connection string
10. Replace `<password>` with your database user password
11. Update your `.env` file with this connection string

## Configuration

After setting up MongoDB, update your `.env` file in `src/server/`:

For local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/mlchat
```

For MongoDB Atlas:
```
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/mlchat?retryWrites=true&w=majority
```

## Testing the Connection

To verify MongoDB is working:

1. Start MongoDB (if using local installation)
2. Run the authentication tests:
   ```
   cd src/server
   npm test
   ```

## Troubleshooting

### Connection Issues

- Ensure MongoDB service is running
- Check that the port (27017) is not blocked by firewall
- Verify the connection string in your `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### Authentication Tests Failing

- Make sure MongoDB is running before running tests
- Check that the test database name (mlchat_test) is correct
- Ensure you have proper network connectivity