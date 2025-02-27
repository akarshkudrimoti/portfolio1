/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio1' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio1/' : '',
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      encoding: false,
      crypto: false,
    };
    return config;
  },
}

module.exports = nextConfig 