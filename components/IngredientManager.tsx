"use client"

import { useState, useEffect } from "react"

interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
  category: string
  expiryDate: string | null
}

export default function IngredientManager() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "kg",
    category: "vegetables",
    expiryDate: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchIngredients()
  }, [])

  const fetchIngredients = async () => {
    try {
      const response = await fetch("/api/ingredients")
      if (response.ok) {
        const data = await response.json()
        setIngredients(data.ingredients)
      }
    } catch (error) {
      console.error("Error fetching ingredients:", error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/ingredients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setIngredients([data.ingredient, ...ingredients])
        setFormData({
          name: "",
          quantity: "",
          unit: "kg",
          category: "vegetables",
          expiryDate: "",
        })
      }
    } catch (error) {
      console.error("Error adding ingredient:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/ingredients?id=${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setIngredients(ingredients.filter(ing => ing.id !== id))
      }
    } catch (error) {
      console.error("Error deleting ingredient:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const isExpiringSoon = (expiryDate: string | null) => {
    if (!expiryDate) return false
    const daysUntil = Math.ceil((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    return daysUntil <= 3 && daysUntil >= 0
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Add New Ingredient</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Ingredient name"
            value={formData.name}
            onChange={handleChange}
            className="input-field"
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="input-field"
            step="0.1"
            required
          />
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="input-field"
          >
            <option value="kg">kg</option>
            <option value="g">g</option>
            <option value="l">l</option>
            <option value="ml">ml</option>
            <option value="pieces">pieces</option>
            <option value="cups">cups</option>
            <option value="tbsp">tbsp</option>
            <option value="tsp">tsp</option>
          </select>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input-field"
          >
            <option value="vegetables">Vegetables</option>
            <option value="fruits">Fruits</option>
            <option value="dairy">Dairy</option>
            <option value="meat">Meat</option>
            <option value="grains">Grains</option>
            <option value="spices">Spices</option>
            <option value="other">Other</option>
          </select>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="input-field"
          />
          <button
            type="submit"
            disabled={loading}
            className="btn-primary md:col-span-2 lg:col-span-5"
          >
            {loading ? "Adding..." : "Add Ingredient"}
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Your Ingredients</h3>
        {ingredients.length === 0 ? (
          <p className="text-gray-500">No ingredients added yet. Start by adding some ingredients above!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className={`border rounded-lg p-4 ${
                  isExpired(ingredient.expiryDate)
                    ? "border-red-300 bg-red-50"
                    : isExpiringSoon(ingredient.expiryDate)
                    ? "border-yellow-300 bg-yellow-50"
                    : "border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-semibold capitalize">{ingredient.name}</h4>
                    <p className="text-sm text-gray-600">
                      {ingredient.quantity} {ingredient.unit}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{ingredient.category}</p>
                    {ingredient.expiryDate && (
                      <p className={`text-xs mt-1 ${
                        isExpired(ingredient.expiryDate)
                          ? "text-red-600 font-semibold"
                          : isExpiringSoon(ingredient.expiryDate)
                          ? "text-yellow-600 font-semibold"
                          : "text-gray-500"
                      }`}>
                        {isExpired(ingredient.expiryDate)
                          ? "Expired"
                          : isExpiringSoon(ingredient.expiryDate)
                          ? "Expiring soon"
                          : `Expires: ${new Date(ingredient.expiryDate).toLocaleDateString()}`}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDelete(ingredient.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}