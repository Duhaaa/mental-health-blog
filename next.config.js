/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com']
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
  env: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  }
};

module.exports = nextConfig
