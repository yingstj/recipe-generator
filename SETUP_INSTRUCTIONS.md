# Recipe Generator Setup Instructions

## Quick Setup Guide

### 1. ✅ Dependencies Installed
The npm dependencies have been installed successfully.

### 2. ✅ Environment Variables Created
The `.env.local` file has been created. You need to update it with:

#### Required Updates:

1. **DATABASE_URL**: Choose one option:
   - **Easiest: Use Neon (Free Cloud Database)**
     - Go to https://neon.tech
     - Sign up for free
     - Create a new project
     - Copy the connection string
     - Replace `DATABASE_URL` in `.env.local`
   
   - **Alternative: Supabase**
     - Go to https://supabase.com
     - Create a free project
     - Get the connection string from Settings → Database
   
   - **Local PostgreSQL** (if you have it installed)
     - Use: `postgresql://postgres:yourpassword@localhost:5432/recipe_generator`

2. **NEXTAUTH_SECRET**: Generate a random secret key
   ```bash
   # Run this command to generate a secure secret:
   openssl rand -base64 32
   ```
   Copy the output and replace `your-secret-key-change-this-to-something-random` in `.env.local`

3. **ANTHROPIC_API_KEY**: Get your Claude API key
   - Go to https://console.anthropic.com/
   - Sign up or log in
   - Go to API keys section
   - Create a new key
   - Replace `your-anthropic-api-key-here` in `.env.local`

### 3. Initialize Database

Once you've updated your `.env.local` file with a valid DATABASE_URL, run:

```bash
# Generate Prisma client
npx prisma generate

# Create database tables
npx prisma migrate dev --name init
```

### 4. Start the Development Server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Troubleshooting

### Database Connection Issues
- Make sure your DATABASE_URL is correct
- For Neon/Supabase, ensure your project is active
- For local PostgreSQL, ensure the service is running

### Prisma Issues
If you get Prisma errors, try:
```bash
npx prisma generate
npx prisma db push
```

### Port Already in Use
If port 3000 is busy:
```bash
npm run dev -- -p 3001
```

## Features Available
- User registration and login
- Add ingredients to your inventory
- Generate AI-powered recipes
- Track food waste
- Create/join households
- Download recipes

## Next Steps
1. Sign up for an account at http://localhost:3000/auth/signup
2. Add some ingredients to your inventory
3. Generate your first recipe!
4. Invite family members to join your household