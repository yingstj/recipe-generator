# 🍳 Recipe Generator - AI-Powered Food Waste Reduction App

Transform your ingredients into delicious recipes while reducing food waste and saving money!

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.11-green)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4)

## 🌟 Features

### 🥗 Smart Ingredient Management
- Track your pantry and fridge inventory
- Monitor expiry dates with visual alerts
- Categorize ingredients for easy organization
- Get notifications for items expiring soon

### 🤖 AI-Powered Recipe Generation
- Generate creative recipes using Claude AI
- Customize based on available ingredients
- Set preparation time preferences
- Support for dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- Choose cuisine styles

### 📊 Food Waste Tracking
- Visual barometer showing environmental impact
- Track items saved from waste
- Calculate money saved
- Monitor CO₂ reduction
- Monthly progress tracking

### 👨‍👩‍👧‍👦 Household Collaboration
- Create or join households
- Share ingredient inventories
- Collaborate on meal planning
- Set collective waste reduction goals
- Invite family members with unique join codes

### 📱 User-Friendly Interface
- Clean, modern design with Tailwind CSS
- Responsive layout for all devices
- Intuitive navigation with tabs
- Real-time updates
- Download recipes as PDF

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (local or cloud)
- Anthropic API key for Claude AI

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/recipe-generator.git
cd recipe-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
ANTHROPIC_API_KEY="your-anthropic-api-key"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma migrate dev
```

5. **Start the development server**
```bash
npm run dev
```

Visit http://localhost:3000 to see your app!

## 🗄️ Database Options

### Cloud (Recommended for beginners)
- **Neon**: Free PostgreSQL hosting at [neon.tech](https://neon.tech)
- **Supabase**: Full backend platform at [supabase.com](https://supabase.com)

### Local Installation
- Install PostgreSQL locally
- Use Docker: `docker run --name recipe-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`

## 🏗️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **AI**: Anthropic Claude API
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
recipe-generator/
├── app/                  # Next.js app router pages
│   ├── api/             # API routes
│   ├── auth/            # Authentication pages
│   └── dashboard/       # Main application
├── components/          # React components
├── lib/                 # Utility functions
├── prisma/              # Database schema
└── public/              # Static assets
```

## 🔒 Security Features

- Secure password hashing with bcrypt
- JWT-based session management
- Protected API routes
- Environment variable protection
- SQL injection prevention with Prisma

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Other Platforms
- Railway
- Render
- Fly.io
- DigitalOcean App Platform

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Anthropic](https://www.anthropic.com/) for Claude AI
- [Vercel](https://vercel.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/recipe-generator](https://github.com/yourusername/recipe-generator)

---

Built with ❤️ to reduce food waste and save the planet 🌍