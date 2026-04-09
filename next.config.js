
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/premium_photo-**',
      },
    ],
  },
};

module.exports = nextConfig;
