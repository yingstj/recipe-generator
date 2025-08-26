"use client"

import { useState, useEffect } from "react"

interface Ingredient {
  id: string
  name: string
  quantity: number
  unit: string
}

interface Recipe {
  title: string
  description: string
  ingredients: any[]
  instructions: string[]
  prepTime: number
  cookTime: number
  servings: number
  difficulty: string
  cuisine: string
}

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([])
  const [prepTime, setPrepTime] = useState("30")
  const [servings, setServings] = useState("4")
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([])
  const [cuisine, setCuisine] = useState("")
  const [recipe, setRecipe] = useState<Recipe | null>(null)
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

  const handleIngredientToggle = (ingredientName: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredientName)
        ? prev.filter(name => name !== ingredientName)
        : [...prev, ingredientName]
    )
  }

  const handleDietaryToggle = (restriction: string) => {
    setDietaryRestrictions(prev =>
      prev.includes(restriction)
        ? prev.filter(r => r !== restriction)
        : [...prev, restriction]
    )
  }

  const generateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      alert("Please select at least one ingredient")
      return
    }

    setLoading(true)
    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ingredients: selectedIngredients,
          prepTime: parseInt(prepTime),
          servings: parseInt(servings),
          dietaryRestrictions,
          cuisine,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setRecipe(data.recipe)
      }
    } catch (error) {
      console.error("Error generating recipe:", error)
      alert("Failed to generate recipe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const downloadPDF = () => {
    if (!recipe) return

    const content = `
${recipe.title}
${recipe.description}

Prep Time: ${recipe.prepTime} minutes
Cook Time: ${recipe.cookTime} minutes
Servings: ${recipe.servings}
Difficulty: ${recipe.difficulty}
Cuisine: ${recipe.cuisine}

Ingredients:
${JSON.parse(JSON.stringify(recipe.ingredients)).map((ing: any) => 
  `- ${ing.quantity} ${ing.unit} ${ing.name}`
).join('\n')}

Instructions:
${JSON.parse(JSON.stringify(recipe.instructions)).map((inst: string, i: number) => 
  `${i + 1}. ${inst}`
).join('\n')}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${recipe.title.replace(/\s+/g, '_')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recipe Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Time (minutes)
            </label>
            <input
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(e.target.value)}
              className="input-field"
              min="5"
              max="180"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Servings
            </label>
            <input
              type="number"
              value={servings}
              onChange={(e) => setServings(e.target.value)}
              className="input-field"
              min="1"
              max="12"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cuisine Type (optional)
            </label>
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="input-field"
              placeholder="e.g., Italian, Asian, Mexican"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Dietary Restrictions
            </label>
            <div className="space-y-2">
              {["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Low-Carb"].map(restriction => (
                <label key={restriction} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={dietaryRestrictions.includes(restriction)}
                    onChange={() => handleDietaryToggle(restriction)}
                    className="mr-2"
                  />
                  <span className="text-sm">{restriction}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Select Ingredients</h3>
        {ingredients.length === 0 ? (
          <p className="text-gray-500">No ingredients available. Add some ingredients first!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ingredients.map((ingredient) => (
              <label
                key={ingredient.id}
                className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedIngredients.includes(ingredient.name)
                    ? "bg-green-50 border-green-500"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ingredient.name)}
                  onChange={() => handleIngredientToggle(ingredient.name)}
                  className="mr-2"
                />
                <span className="text-sm capitalize">{ingredient.name}</span>
              </label>
            ))}
          </div>
        )}
        
        <button
          onClick={generateRecipe}
          disabled={loading || selectedIngredients.length === 0}
          className="btn-primary mt-6 w-full"
        >
          {loading ? "Generating Recipe..." : "Generate Recipe"}
        </button>
      </div>

      {recipe && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-recipe-primary">{recipe.title}</h3>
            <button
              onClick={downloadPDF}
              className="btn-secondary text-sm px-4 py-2"
            >
              Download Recipe
            </button>
          </div>
          
          <p className="text-gray-600 mb-4">{recipe.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Prep Time</p>
              <p className="font-semibold">{recipe.prepTime} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Cook Time</p>
              <p className="font-semibold">{recipe.cookTime} min</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Servings</p>
              <p className="font-semibold">{recipe.servings}</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Difficulty</p>
              <p className="font-semibold">{recipe.difficulty}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">Ingredients</h4>
              <ul className="space-y-2">
                {JSON.parse(JSON.stringify(recipe.ingredients)).map((ing: any, i: number) => (
                  <li key={i} className="flex items-start">
                    <span className="text-recipe-primary mr-2">•</span>
                    <span className="text-gray-700">
                      {ing.quantity} {ing.unit} {ing.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-3">Instructions</h4>
              <ol className="space-y-3">
                {JSON.parse(JSON.stringify(recipe.instructions)).map((instruction: string, i: number) => (
                  <li key={i} className="flex">
                    <span className="font-semibold text-recipe-primary mr-3">{i + 1}.</span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}