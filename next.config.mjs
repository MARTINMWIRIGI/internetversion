import { defineNextConfig } from 'next';

export default defineNextConfig({
  reactStrictMode: true,          // Recommended for catching potential issues
  swcMinify: true,                 // Use SWC for faster minification
  experimental: {
    turbo: false,                  // Disable Turbopack, force Webpack
  },
  images: {
    domains: ['your-domain.com'],  // Add any external image domains you use
  },
  eslint: {
    ignoreDuringBuilds: true,      // Optional: skip ESLint during production builds
  },
  // Optional: any other Next.js settings go here
});