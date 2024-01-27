/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'lh3.googleusercontent.com',
      'res.cloudinary.com',
    ],
  },
  experimental: {
    appDir: true,
  },
  reactStrictMode: false,
};

module.exports = nextConfig;
