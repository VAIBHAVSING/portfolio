import { NextResponse } from "next/server";

export async function GET() {
  const staticRedirects = {
    // Primary short links
    "/gh": "GitHub Profile",
    "/in": "LinkedIn Profile",
    "/x": "Twitter/X Profile",
    "/cal": "Schedule 15min Call",
    "/email": "Send Email",
    "/gh-portfolio": "Portfolio Source Code",

    // API prefix alternatives (same destinations)
    "/api/gh": "GitHub Profile (API route)",
    "/api/in": "LinkedIn Profile (API route)",
    "/api/x": "Twitter/X Profile (API route)",
    "/api/cal": "Schedule Call (API route)",
    "/api/email": "Send Email (API route)",
    "/api/gh-portfolio": "Portfolio Source (API route)",

    // Middleware handled aliases
    "/github": "GitHub Profile (alias)",
    "/linkedin": "LinkedIn Profile (alias)",
    "/twitter": "Twitter Profile (alias)",
    "/calendar": "Calendar Booking (alias)",
    "/mail": "Email Contact (alias)",
  };

  return NextResponse.json({
    message: "Portfolio Static Redirect Routes",
    note: "All redirects are handled at build-time for maximum performance",
    performance: "Static redirects (307) - Faster than API routes",
    routes: staticRedirects,
  });
}
