/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Remove custom keys from config
  // Move apiUrl and fileUrl to .env instead

  images: {
    domains: ['localhost', 'admin.viralon.in'], // no http:// here
  },
};

module.exports = nextConfig;
