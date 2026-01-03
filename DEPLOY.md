# Deployment Guide for Apexora Digital Assets

This project is a **Full-Stack Node.js Application** consisting of an Express backend and a React frontend. Because it runs a persistent server, it is best deployed on a platform like **Render**, **Railway**, or **Heroku**, rather than Vercel (which is optimized for static/serverless apps).

We recommend using **Render** as it offers a generous free tier and natively supports this architecture.

## 🚀 Option 1: Deploy to Render (Recommended)

Follow these steps to deploy your application for free.

### 1. Push Code to GitHub
Ensure your latest changes are committed and pushed to your GitHub repository.
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. Create a Render Account
Go to [dashboard.render.com](https://dashboard.render.com/) and sign up/log in with your GitHub account.

### 3. Create a New Web Service
1. Click the **"New +"** button in the top right corner.
2. Select **"Web Service"**.
3. Connect your GitHub repository.

### 4. Configure the Service
Use the following settings exactly as shown:

| Setting | Value |
|---------|-------|
| **Name** | `apexora-digital-assets` (or your preferred name) |
| **Language** | `Node` |
| **Branch** | `main` |
| **Build Command** | `npm run build` |
| **Start Command** | `npm run start` |

### 5. Environment Variables
If you are using a real database (PostgreSQL), scroll down to the "Environment Variables" section and add:

- `DATABASE_URL`: `postgres://...` (Your connection string)
- `NODE_ENV`: `production`

*Note: If you haven't set up a real database yet, the app will use its internal mock storage or default connections.*

### 6. Deploy
Click **"Create Web Service"**. Render will start building your application. You can watch the logs in the dashboard.
- It will install dependencies.
- It will run the build script.
- It will start the server.

Once you see `serving on port ...`, your app is live! Click the URL provided at the top left (e.g., `https://apexora-digital-assets.onrender.com`).

---

## ❓ Why not Vercel?

Vercel is excellent for Next.js and static sites, but this project uses a custom Express server (`server/index.ts`) to handle API requests and serve the frontend. Vercel's serverless environment does not support long-running Node.js processes like `npm run start`. To use Vercel, you would need to rewrite the backend to use Serverless Functions, which is a significant refactor.

## Debugging Deployment

If the build fails:
1. Check the "Logs" tab in Render.
2. Ensure `npm run build` works locally before pushing.
3. Verify that `package.json` has the correct `start` script: `"start": "cross-env NODE_ENV=production node dist/index.cjs"`.
