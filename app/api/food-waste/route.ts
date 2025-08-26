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

    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const wasteRecords = await prisma.foodWaste.findMany({
      where: {
        userId: session.user.id,
        wastedAt: {
          gte: thirtyDaysAgo,
        },
      },
      orderBy: { wastedAt: "desc" },
    })

    const totalWaste = wasteRecords.reduce((acc, record) => acc + record.quantity, 0)
    
    const moneySaved = totalWaste * 5
    const co2Reduced = totalWaste * 2.5

    return NextResponse.json({
      records: wasteRecords,
      stats: {
        totalWaste: totalWaste.toFixed(2),
        moneySaved: moneySaved.toFixed(2),
        co2Reduced: co2Reduced.toFixed(2),
        itemsSaved: wasteRecords.length,
      },
    })
  } catch (error) {
    console.error("Error fetching food waste data:", error)
    return NextResponse.json(
      { error: "Failed to fetch food waste data" },
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
    const { ingredientName, quantity, unit, reason } = body

    if (!ingredientName || !quantity || !unit) {
      return NextResponse.json(
        { error: "Ingredient name, quantity, and unit are required" },
        { status: 400 }
      )
    }

    const wasteRecord = await prisma.foodWaste.create({
      data: {
        ingredientName,
        quantity: parseFloat(quantity),
        unit,
        reason,
        userId: session.user.id,
      },
    })

    return NextResponse.json({ wasteRecord })
  } catch (error) {
    console.error("Error creating food waste record:", error)
    return NextResponse.json(
      { error: "Failed to create food waste record" },
      { status: 500 }
    )
  }
}