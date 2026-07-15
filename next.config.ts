import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verification builds MUST NOT write the live `.next`.
  //
  // ecole.service runs `next start` from this same directory and holds the
  // build's chunk manifest in memory. A `npm run build` here rewrites `.next`
  // with new content-hashed chunk names, so the already-running process starts
  // serving HTML that points at files no longer on disk → every chunk 400s →
  // `ChunkLoadError` → fatal white screen on every page. That is not
  // theoretical: the autoloop's build gate did exactly this on 07-11 and the
  // live site served a fatal error to real visitors for four days (P4-T5).
  //
  // So `npm run build:verify` sets NEXT_DIST_DIR=.next-verify and builds into
  // a scratch directory, leaving the running deploy untouched. The service's
  // unit sets no NEXT_DIST_DIR, so `next start` keeps reading `.next`.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
