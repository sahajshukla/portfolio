/** @type {import('next').NextConfig} */

// Content Security Policy
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https: http:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.clarity.ms https://*.clarity.ms https://vitals.vercel-insights.com;
  media-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  frame-src 'none';
  worker-src 'self' blob:;
  manifest-src 'self';
  upgrade-insecure-requests;
`;

// Security Headers Configuration
const securityHeaders = [
  // Content Security Policy - Prevents XSS, clickjacking, code injection
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim(),
  },
  // Strict Transport Security - Force HTTPS for 2 years
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // Prevent clickjacking
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // Prevent MIME type sniffing
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // Control DNS prefetching
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // XSS Protection (legacy browsers)
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  // Control referrer information
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // Permissions Policy - Restrict browser features
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
  },
  // Cross-Origin policies for additional isolation
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Embedder-Policy',
    value: 'credentialless',
  },
];

const nextConfig = {
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    domains: ['medium.com', 'cdn-images-1.medium.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.medium.com',
      },
    ],
  },

  // Apply security headers to all routes
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },

  // Disable x-powered-by header
  poweredByHeader: false,

  // Compress responses
  compress: true,
};

module.exports = nextConfig;
