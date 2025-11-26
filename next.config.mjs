/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // 👇 THIS is the missing part that enables static export in Next.js 13–16
  output: 'export',

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-domain.com",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;