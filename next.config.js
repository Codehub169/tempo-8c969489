/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Example, user should adjust if needed
      },
    ],
  },
  webpack(config, { dev, isServer }) {
    // This is an example of how you might have other webpack rules (like SVGR shown here).
    // Ensure your existing rules are preserved.
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    // Add this section to improve HMR reliability in Docker environments
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding after a change
      };
    }

    return config;
  },
};

module.exports = nextConfig;