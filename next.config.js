/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles')]
  },
  api: {
    responseLimit: false
  }
}

module.exports = nextConfig
