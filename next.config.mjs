/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  webpack: (config, { isServer }) => {
    config.resolve.alias['@react-native-async-storage/async-storage'] = false
    // Exclude node_modules from source-map-loader to prevent CSS module ID collisions
    // caused by viem's source maps being inlined into the webpack bundle
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.use && Array.isArray(rule.use)) {
        return {
          ...rule,
          use: rule.use.filter((use) => {
            const loader = typeof use === 'string' ? use : use?.loader
            return !loader?.includes('source-map-loader')
          }),
        }
      }
      if (rule.loader?.includes('source-map-loader')) return { ...rule, exclude: /node_modules/ }
      return rule
    })
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }
    return config
  },
};

export default nextConfig;