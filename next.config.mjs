/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Disable Turbopack, use Webpack
  },
  reactStrictMode: true,
};

export default nextConfig;