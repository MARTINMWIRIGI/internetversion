/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone', // required for server-side functions on Cloudflare
  experimental: {
    serverActions: true, // if using server actions
  },
};

export default nextConfig;