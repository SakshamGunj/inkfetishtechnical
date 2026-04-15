import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/authorsite/login',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/authorsite/signup',
        destination: '/signup',
        permanent: true,
      },
      {
        source: '/authorsite',
        destination: '/authorsite/dashboard',
        permanent: true,
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
