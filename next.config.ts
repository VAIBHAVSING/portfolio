import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow optimized remote avatars from GitHub (recommended remotePatterns API)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**'
      }
    ]
  },
  
  // Static redirects for maximum performance
  async redirects() {
    return [
      {
        source: '/gh',
        destination: 'https://github.com/VAIBHAVSING',
        permanent: false, // Use 307 for dynamic profile links
      },
      {
        source: '/api/gh',
        destination: 'https://github.com/VAIBHAVSING', 
        permanent: false,
      },
      {
        source: '/gh-portfolio',
        destination: 'https://github.com/VAIBHAVSING/portfolio',
        permanent: false,
      },
      {
        source: '/api/gh-portfolio',
        destination: 'https://github.com/VAIBHAVSING/portfolio',
        permanent: false,
      },
      {
        source: '/in',
        destination: 'https://www.linkedin.com/in/vaibhavpatil24/',
        permanent: false,
      },
      {
        source: '/api/in',
        destination: 'https://www.linkedin.com/in/vaibhavpatil24/',
        permanent: false,
      },
      {
        source: '/x',
        destination: 'https://x.com/Vsing11',
        permanent: false,
      },
      {
        source: '/api/x',
        destination: 'https://x.com/Vsing11',
        permanent: false,
      },
      {
        source: '/cal',
        destination: 'https://cal.com/vaibhavsing/15min',
        permanent: false,
      },
      {
        source: '/api/cal',
        destination: 'https://cal.com/vaibhavsing/15min',
        permanent: false,
      },
      {
        source: '/email',
        destination: 'mailto:vpatil5212@gmail.com',
        permanent: false,
      },
      {
        source: '/api/email',
        destination: 'mailto:vpatil5212@gmail.com',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
