/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // ✅ Remove custom keys from config
  // Move apiUrl and fileUrl to .env instead

  images: {
    // `domains` is deprecated/removed — Next.js now requires remotePatterns.
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'admin.viralon.in' },
    ],
  },
};

module.exports = nextConfig;
