import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-recipe-primary">RecipeGen</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/signin" className="text-gray-700 hover:text-recipe-primary">
                Sign In
              </Link>
              <Link href="/auth/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Turn Your Ingredients Into
            <span className="text-recipe-primary"> Amazing Recipes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Reduce food waste, save money, and discover delicious meals with AI-powered recipe generation
            tailored to your ingredients and preferences.
          </p>
          <Link href="/auth/signup" className="btn-primary text-lg px-8 py-4 inline-block">
            Start Cooking Smarter
          </Link>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-recipe-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Track Ingredients</h4>
              <p className="text-gray-600">Keep track of what's in your pantry and fridge with expiry date monitoring</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-recipe-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">AI Recipe Generation</h4>
              <p className="text-gray-600">Get creative recipes tailored to your available ingredients and preferences</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-waste-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a2 2 0 002 2h14a2 2 0 002-2l-3-9m-14 0h18" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-2">Reduce Waste</h4>
              <p className="text-gray-600">Track and reduce food waste while saving money and helping the environment</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-recipe-primary rounded-2xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Saving?</h3>
            <p className="text-xl mb-8">Join thousands of users reducing food waste and discovering amazing recipes</p>
            <Link href="/auth/signup" className="bg-white text-recipe-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
              Get Started Free
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}