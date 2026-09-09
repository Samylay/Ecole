# Production build recovery, 2026-09-09

The production service restarted repeatedly because `.next/BUILD_ID` was
missing. The output directory contained development hot-update files. A local
development server had overwritten the production artifact.

The Next configuration now isolates development output in `.next-dev`, even
for a direct `next dev` invocation. Production continues to use `.next` and
verification uses `.next-verify`. The stale build instruction in CLAUDE.md was
corrected to use `build:verify`.

Verification: typecheck and build:verify passed with a temporary database path.
Next's config loader confirmed the development, production build, production
server, and explicit verification output directories. With the failing service
stopped, a new production artifact was built using another temporary database
path, then the service was started. No live database or schema was manually
edited. The old development artifact is retained under ignored
`.scratch/recovery/next-before-20260909`.

All three unchanged standing predicates passed: ecole-live, ecole-chunks-load,
and ecole-monitoring. A browser GET-only check confirmed that the public
homepage renders without exceptions or failed static assets. The local auth
endpoint returns 401 without a session, and the monitoring probe reports 1.
