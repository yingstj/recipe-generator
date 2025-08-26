import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { nanoid } from "nanoid"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { name, wasteGoal } = body

    if (!name) {
      return NextResponse.json(
        { error: "Household name is required" },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: { household: true },
    })

    if (user?.household) {
      return NextResponse.json(
        { error: "You are already part of a household" },
        { status: 400 }
      )
    }

    const joinCode = nanoid(8).toUpperCase()

    const household = await prisma.household.create({
      data: {
        name,
        joinCode,
        wasteGoal: wasteGoal ? parseFloat(wasteGoal) : 10,
        members: {
          connect: { id: session.user.id },
        },
      },
      include: {
        members: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json({ household })
  } catch (error) {
    console.error("Error creating household:", error)
    return NextResponse.json(
      { error: "Failed to create household" },
      { status: 500 }
    )
  }
}