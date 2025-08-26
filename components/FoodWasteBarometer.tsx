"use client"

import { useEffect, useState } from "react"

interface WasteStats {
  itemsSaved: number
  moneySaved: string
  co2Reduced: string
}

export default function FoodWasteBarometer() {
  const [stats, setStats] = useState<WasteStats>({
    itemsSaved: 0,
    moneySaved: "0",
    co2Reduced: "0",
  })

  useEffect(() => {
    fetchWasteStats()
  }, [])

  const fetchWasteStats = async () => {
    try {
      const response = await fetch("/api/food-waste")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Error fetching waste stats:", error)
    }
  }

  const getProgressWidth = (value: number, max: number) => {
    return Math.min((value / max) * 100, 100)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Impact This Month</h2>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Items Saved from Waste</span>
            <span className="text-sm font-bold text-waste-green">{stats.itemsSaved} items</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-waste-green h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressWidth(stats.itemsSaved, 50)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Money Saved</span>
            <span className="text-sm font-bold text-waste-green">${stats.moneySaved}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-waste-green h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressWidth(parseFloat(stats.moneySaved), 200)}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">CO₂ Reduced</span>
            <span className="text-sm font-bold text-waste-green">{stats.co2Reduced} kg</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-waste-green h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressWidth(parseFloat(stats.co2Reduced), 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          Great job! You're making a real difference. Keep using your ingredients before they expire!
        </p>
      </div>
    </div>
  )
}