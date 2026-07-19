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
    // Lesson pages embed a YouTube iframe (P3-T1/P3-T4) and Next.js App
    // Router hydration relies on inline scripts with no nonce plumbing yet,
    // so script-src/style-src need 'unsafe-inline' rather than a stricter
    // nonce-based policy — still meaningfully narrows default-src/frame-src/
    // connect-src down from "anything goes".
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://www.youtube.com https://s.ytimg.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-src https://www.youtube.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
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
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
