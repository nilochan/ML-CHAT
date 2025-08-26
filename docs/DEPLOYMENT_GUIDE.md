# Deployment Guide for Railway

This guide will help you deploy the ML-CHAT application to Railway.

## Prerequisites

1. Railway account (https://railway.app/)
2. MongoDB Atlas account (for production database)
3. GitHub account (for continuous deployment)

## Deployment Steps

### 1. Prepare Your Application

Ensure your application is ready for deployment:

1. Test locally to make sure everything works
2. Update environment variables in Railway dashboard
3. Ensure all dependencies are in package.json files

### 2. Set Up MongoDB Atlas

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account or log in
3. Create a new cluster (M0 Sandbox is free)
4. Select AWS, GCP, or Azure as provider
5. Choose a region near your users
6. Create cluster (takes a few minutes)
7. Once created, click "Connect"
8. Select "Connect your application"
9. Copy the connection string
10. Replace `<password>` with your database user password

### 3. Deploy to Railway

#### Option 1: Deploy from GitHub (Recommended)

1. Fork this repository to your GitHub account
2. Go to https://railway.app/
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your forked repository
6. Railway will automatically detect the project structure
7. Configure environment variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key for JWT tokens
   - `JWT_EXPIRE`: Token expiration time (e.g., "7d")
   - `PORT`: 5000 (or let Railway auto-assign)

#### Option 2: Deploy from CLI

1. Install Railway CLI:
   ```bash
   npm install -g @railway/cli
   ```

2. Login to Railway:
   ```bash
   railway login
   ```

3. Initialize project:
   ```bash
   railway init
   ```

4. Deploy:
   ```bash
   railway up
   ```

### 4. Configure Environment Variables

In the Railway dashboard:

1. Go to your project
2. Click on your service
3. Go to the "Settings" tab
4. Click "Add Variable" for each:
   - `MONGODB_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A strong secret key
   - `JWT_EXPIRE`: Token expiration (e.g., "7d")
   - `PORT`: 5000

### 5. Set Up Custom Domain (Optional)

1. In Railway dashboard, go to your service
2. Click "Settings" tab
3. Scroll to "Custom Domain"
4. Add your domain
5. Follow instructions to configure DNS

### 6. Enable Automatic Deployments

1. In Railway dashboard, go to your service
2. Click "Settings" tab
3. Scroll to "Deployments"
4. Enable "Auto Deploy"

## Environment Variables

The following environment variables need to be set in Railway:

| Variable | Description | Example Value |
|----------|-------------|---------------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/mlchat` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secret-jwt-key` |
| `JWT_EXPIRE` | Token expiration time | `7d` |
| `PORT` | Server port | `5000` |

## Troubleshooting

### Common Issues

1. **Application crashes on startup**
   - Check logs in Railway dashboard
   - Verify all environment variables are set
   - Ensure MongoDB connection string is correct

2. **Database connection errors**
   - Check MongoDB Atlas IP whitelist
   - Verify username/password in connection string
   - Ensure MongoDB cluster is not paused

3. **CORS errors**
   - Check that frontend URL is in CORS whitelist
   - Update CORS configuration in `src/server/src/index.ts`

### Monitoring

1. Use Railway's built-in logging
2. Set up alerts for crashes or high resource usage
3. Monitor MongoDB Atlas performance dashboard

## Scaling

Railway automatically scales your application based on demand. For manual scaling:

1. In Railway dashboard, go to your service
2. Click "Settings" tab
3. Adjust "Performance" settings as needed

## Updates

To update your deployed application:

1. Push changes to your GitHub repository
2. If auto-deploy is enabled, Railway will automatically deploy
3. If not, manually trigger deployment in Railway dashboard