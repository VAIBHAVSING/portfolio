import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle fast redirects at edge for maximum performance
  const url = request.nextUrl.clone()
  
  // Additional fast redirects (if needed for custom logic)
  const fastRedirects = new Map([
    ['/github', 'https://github.com/VAIBHAVSING'],
    ['/linkedin', 'https://www.linkedin.com/in/vaibhavpatil24/'],
    ['/twitter', 'https://x.com/Vsing11'],
    ['/calendar', 'https://cal.com/vaibhavsing/15min'],
    ['/mail', 'mailto:vpatil5212@gmail.com'],
  ])
  
  const redirect = fastRedirects.get(url.pathname)
  if (redirect) {
    return NextResponse.redirect(redirect, 307)
  }
  
  return NextResponse.next()
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    '/github',
    '/linkedin', 
    '/twitter',
    '/calendar',
    '/mail',
  ]
}