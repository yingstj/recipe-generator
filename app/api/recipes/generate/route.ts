import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { generateRecipe } from "@/lib/claude"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { ingredients, prepTime, dietaryRestrictions, servings, cuisine } = body

    if (!ingredients || ingredients.length === 0) {
      return NextResponse.json(
        { error: "At least one ingredient is required" },
        { status: 400 }
      )
    }

    const recipe = await generateRecipe({
      ingredients,
      prepTime,
      dietaryRestrictions,
      servings,
      cuisine,
    })

    const savedRecipe = await prisma.recipe.create({
      data: {
        title: recipe.title,
        description: recipe.description,
        ingredients: recipe.ingredients,
        instructions: recipe.instructions,
        prepTime: recipe.prepTime,
        cookTime: recipe.cookTime,
        servings: recipe.servings,
        difficulty: recipe.difficulty,
        cuisine: recipe.cuisine,
        savedIngredients: ingredients,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ recipe: savedRecipe })
  } catch (error) {
    console.error("Recipe generation error:", error)
    return NextResponse.json(
      { error: "Failed to generate recipe" },
      { status: 500 }
    )
  }
}