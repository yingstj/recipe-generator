# 🚀 Deployment Guide for Recipe Generator

## ✅ Your Code is Ready on GitHub!

Your repository is updated at: https://github.com/yingstj/recipe-generator

## 📋 Deploy to Vercel in 5 Minutes

### Step 1: Go to Vercel
1. Open https://vercel.com
2. Click "Sign Up" or "Log In"
3. **Use your GitHub account** to sign in

### Step 2: Import Your Project
1. Click "Add New..." → "Project"
2. Find and select `yingstj/recipe-generator`
3. Click "Import"

### Step 3: Configure Environment Variables
Click "Environment Variables" and add these 4 variables:

1. **DATABASE_URL**
   - Get from your Neon dashboard: https://console.neon.tech
   - Use the connection string from your project

2. **NEXTAUTH_SECRET**
   - Generate one with: `openssl rand -base64 32`
   - Or use any random string

3. **ANTHROPIC_API_KEY**
   - Get from: https://console.anthropic.com/settings/keys
   - Create a new API key for your app

4. **NEXTAUTH_URL**
   - Initially set to: `https://[your-app-name].vercel.app`
   - Update after deployment with your actual URL

### Step 4: Deploy
1. Click "Deploy"
2. Wait 2-3 minutes for deployment
3. Your app will be live!

## 🎉 After Deployment

### Your App URL
Your app will be available at something like:
- `https://recipe-generator-yingstj.vercel.app`
- Or `https://recipe-generator-git-main-yingstj.vercel.app`

### Update NEXTAUTH_URL
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Edit `NEXTAUTH_URL` to match your actual URL
3. Redeploy by going to Deployments → three dots → Redeploy

## 🔧 Troubleshooting

### If you get authentication errors:
- Make sure `NEXTAUTH_URL` matches your Vercel URL exactly
- Check that all environment variables are added correctly

### If database doesn't work:
- Verify your Neon database is still active
- Check the DATABASE_URL is copied correctly

### If AI recipes don't generate:
- Verify your Anthropic API key is correct
- Check you have credits in your Anthropic account

## 📱 Share Your App!

Once deployed, you can:
- Share the link with friends and family
- Add to your phone's home screen for app-like experience
- Access from anywhere in the world

## Need Help?
Your app is currently running locally at: http://localhost:3000
GitHub Repository: https://github.com/yingstj/recipe-generator