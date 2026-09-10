/** @type {import('next').NextConfig} */

// The old HTML/PHP site on viralon.in used a /services/{digital,design}/... URL
// structure. Those URLs are indexed and linked from elsewhere, so every one of
// them is mapped onto its equivalent page here rather than being left to 404.
const LEGACY_SERVICE_URLS = {
  '/services/digital/social-media-marketing': '/our-services/social-media-marketing',
  '/services/digital/search-engine-optimization': '/our-services/seo',
  '/services/digital/paid-media-marketing': '/our-services/paid-media-marketing',
  '/services/digital/email-marketing': '/our-services/email-marketing',
  '/services/digital/video-marketing': '/our-services/production',
  '/services/digital/digital-marketing': '/our-services/digital-marketing',
  // No dedicated influencer page yet; social media is the nearest match.
  '/services/digital/influencer-marketing': '/our-services/social-media-marketing',
  '/services/design/product-level-design': '/our-services/product-packaging',
  '/services/design/brand-identity': '/our-services/brand-identity-design',
  '/services/design/logo-design': '/our-services/logo-design',
  '/services/design/ui-ux': '/our-services/web-development',
  '/services/design/web-development': '/our-services/web-development',
};

const nextConfig = {
  reactStrictMode: true,

  // ✅ Remove custom keys from config
  // Move apiUrl and fileUrl to .env instead

  images: {
    // `domains` is deprecated/removed — Next.js now requires remotePatterns.
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'admin.viralon.in' },
      { protocol: 'https', hostname: 'viralon.in' },
      { protocol: 'https', hostname: 'www.viralon.in' },
    ],
  },

  async redirects() {
    return [
      ...Object.entries(LEGACY_SERVICE_URLS).map(([source, destination]) => ({
        source,
        destination,
        permanent: true,
      })),
      // Anything else under the old /services tree lands on the homepage —
      // there is no /our-services index to send it to.
      { source: '/services/:section/:slug*', destination: '/', permanent: true },
      { source: '/services', destination: '/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
