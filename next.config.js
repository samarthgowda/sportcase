/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  env: {},
  images: {
    domains: ["storage.googleapis.com"],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // set 'fs' to an empty module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
        path: false,
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            // allows browsers to proactively perform domain name resolution on external links, images, CSS, JavaScript.
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            // informs browsers it should only be accessed using HTTPS, instead of using HTTP
            // If we're deploying to Vercel, this header is not necessary as it's automatically added to all deployments
            // unless we declare headers in our next.config.js.
            // valid for only two years
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            // stops pages from loading when they detect reflected cross-site scripting (XSS) attacks.
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // indicates whether the site should be allowed to be displayed within an iframe.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set.
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            // controls how much information the browser includes when navigating from the current website (origin) to another
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          // {
          //   // helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks
          //   key: "Content-Security-Policy",
          //   value: contentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          // },
        ],
      },
    ];
  },

  webpack5: true,
};
