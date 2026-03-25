/** @type {import('next').NextConfig} */
const nextConfig = {
/*  experimental: {
    turbopack: {
      root: '.'
    }
  }, */
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
