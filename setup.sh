#!/bin/bash

echo "🚀 Recipe Generator Setup Script"
echo "================================"
echo ""

# Check if .env.local has been updated
if grep -q "postgresql://username:password" .env.local || grep -q "sk-ant-api-your-key-here" .env.local; then
    echo "⚠️  WARNING: You need to update your .env.local file first!"
    echo ""
    echo "Please update:"
    echo "1. DATABASE_URL with your Neon connection string"
    echo "2. ANTHROPIC_API_KEY with your Anthropic API key"
    echo ""
    echo "Then run this script again: ./setup.sh"
    exit 1
fi

echo "✅ Environment variables look configured!"
echo ""

echo "📦 Step 1: Generating Prisma client..."
npx prisma generate

echo ""
echo "🗄️  Step 2: Creating database tables..."
npx prisma migrate dev --name init

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Now you can start the development server with:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser"