import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

interface RecipeGenerationParams {
  ingredients: string[]
  prepTime?: number
  dietaryRestrictions?: string[]
  servings?: number
  cuisine?: string
}

export async function generateRecipe(params: RecipeGenerationParams) {
  const { ingredients, prepTime = 30, dietaryRestrictions = [], servings = 4, cuisine } = params

  const prompt = `You are a creative chef helping to reduce food waste. Create a delicious recipe using these ingredients: ${ingredients.join(", ")}.

Requirements:
- Preparation time: approximately ${prepTime} minutes
- Servings: ${servings}
- ${dietaryRestrictions.length > 0 ? `Dietary restrictions: ${dietaryRestrictions.join(", ")}` : "No dietary restrictions"}
- ${cuisine ? `Cuisine style: ${cuisine}` : "Any cuisine style"}

Please provide the recipe in the following JSON format:
{
  "title": "Creative recipe name",
  "description": "Brief description of the dish",
  "ingredients": [
    {
      "name": "ingredient name",
      "quantity": "amount",
      "unit": "measurement unit"
    }
  ],
  "instructions": [
    "Step 1",
    "Step 2",
    ...
  ],
  "prepTime": number in minutes,
  "cookTime": number in minutes,
  "servings": number of servings,
  "difficulty": "Easy/Medium/Hard",
  "cuisine": "cuisine type"
}

Be creative with the recipe name and make it appealing! Focus on minimizing waste and using all provided ingredients effectively.`

  try {
    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })

    const content = response.content[0]
    if (content.type === 'text') {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
    }
    
    throw new Error("Failed to parse recipe from response")
  } catch (error) {
    console.error("Error generating recipe:", error)
    throw new Error("Failed to generate recipe")
  }
}