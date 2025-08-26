import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { joinCode } = body

    if (!joinCode) {
      return NextResponse.json(
        { error: "Join code is required" },
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

    const household = await prisma.household.findUnique({
      where: { joinCode: joinCode.toUpperCase() },
    })

    if (!household) {
      return NextResponse.json(
        { error: "Invalid join code" },
        { status: 404 }
      )
    }

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        householdId: household.id,
      },
    })

    const updatedHousehold = await prisma.household.findUnique({
      where: { id: household.id },
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

    return NextResponse.json({ household: updatedHousehold })
  } catch (error) {
    console.error("Error joining household:", error)
    return NextResponse.json(
      { error: "Failed to join household" },
      { status: 500 }
    )
  }
}