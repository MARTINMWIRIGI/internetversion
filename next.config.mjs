/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },

  // The important part for Cloudflare Pages
  output: "export",
};

export default nextConfig;