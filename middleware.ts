import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const pathname = req.nextUrl.pathname
        
        if (pathname.startsWith("/auth")) return true
        if (pathname === "/") return true
        
        if (pathname.startsWith("/dashboard") || 
            pathname.startsWith("/api/recipes") ||
            pathname.startsWith("/api/ingredients") ||
            pathname.startsWith("/api/food-waste") ||
            pathname.startsWith("/api/household")) {
          return !!token
        }
        
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/recipes/:path*',
    '/api/ingredients/:path*',
    '/api/food-waste/:path*',
    '/api/household/:path*',
  ]
}