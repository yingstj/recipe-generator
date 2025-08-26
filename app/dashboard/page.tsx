"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import FoodWasteBarometer from "@/components/FoodWasteBarometer"
import IngredientManager from "@/components/IngredientManager"
import RecipeGenerator from "@/components/RecipeGenerator"
import HouseholdManager from "@/components/HouseholdManager"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState("ingredients")

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-recipe-primary">RecipeGen Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {session.user?.email}</span>
              <button 
                onClick={() => window.location.href = "/api/auth/signout"}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <FoodWasteBarometer />

        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("ingredients")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "ingredients"
                    ? "border-recipe-primary text-recipe-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Ingredients
              </button>
              <button
                onClick={() => setActiveTab("recipes")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "recipes"
                    ? "border-recipe-primary text-recipe-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Generate Recipes
              </button>
              <button
                onClick={() => setActiveTab("household")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "household"
                    ? "border-recipe-primary text-recipe-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Household
              </button>
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === "ingredients" && <IngredientManager />}
            {activeTab === "recipes" && <RecipeGenerator />}
            {activeTab === "household" && <HouseholdManager />}
          </div>
        </div>
      </div>
    </div>
  )
}