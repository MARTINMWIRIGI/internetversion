/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",  // 🔥 allows API routes
  reactStrictMode: true,

  experimental: {
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

export default nextConfig;