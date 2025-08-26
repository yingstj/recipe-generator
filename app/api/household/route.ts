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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        household: {
          include: {
            members: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    })

    if (!user?.household) {
      return NextResponse.json({ household: null })
    }

    return NextResponse.json({ household: user.household })
  } catch (error) {
    console.error("Error fetching household:", error)
    return NextResponse.json(
      { error: "Failed to fetch household" },
      { status: 500 }
    )
  }
}