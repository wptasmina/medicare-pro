// middleware.js
import { NextRequest, NextResponse } from 'next/server';



export function middleware(request: NextRequest) {
  const token = request.cookies.get('your_auth_token'); // Get your authentication token from cookies

  console.log('Middleware triggered for path:', token);

  // Define your protected routes (e.g., an array of paths)
  const protectedRoutes = ['/dashboard', '/profile', '/settings'];

  // Check if the current path is a protected route
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (!token) {
      // If no token, redirect to login page
      const url = request.nextUrl.clone();
      url.pathname = '/signin'; // Your login page path
      return NextResponse.redirect(url);
    }
    // Optionally, you can add token validation logic here
    // For example, if your token is a JWT, you might verify it
    // try {
    //   jwt.verify(token.value, process.env.JWT_SECRET);
    // } catch (error) {
    //   const url = request.nextUrl.clone();
    //   url.pathname = '/login';
    //   return NextResponse.redirect(url);
    // }
  }

  // If the path is not protected or token is valid, continue
  return NextResponse.next();
}

// Define the paths where the middleware should run
// This is crucial for performance.
export const config = {
  matcher: ["/((?!_next|[^?]\\.(?:[^/]+$)).)", "/(api|trpc)(.*)"],
};