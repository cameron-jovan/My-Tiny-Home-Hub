import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/whats-my-tiny-worth',
        destination: '/whats-my-tiny-home-worth',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
