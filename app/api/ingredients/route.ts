import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const ingredients = await prisma.ingredient.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ ingredients })
  } catch (error) {
    console.error("Error fetching ingredients:", error)
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, quantity, unit, category, expiryDate } = body

    if (!name || !quantity || !unit || !category) {
      return NextResponse.json(
        { error: "Name, quantity, unit, and category are required" },
        { status: 400 }
      )
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        quantity: parseFloat(quantity),
        unit,
        category,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ ingredient })
  } catch (error) {
    console.error("Error creating ingredient:", error)
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Ingredient ID is required" },
        { status: 400 }
      )
    }

    await prisma.ingredient.delete({
      where: {
        id,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ message: "Ingredient deleted successfully" })
  } catch (error) {
    console.error("Error deleting ingredient:", error)
    return NextResponse.json(
      { error: "Failed to delete ingredient" },
      { status: 500 }
    )
  }
}