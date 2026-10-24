#!/usr/bin/env bash
# Builds the package, then typechecks and builds each consuming app against it.
# EZPG_WEB prerenders pages, so an EZPG API must be running at API_URL.
set -euo pipefail
cd "$(dirname "$0")/.."
APPS="${EZPG_APPS:-../EZPG/apps/EZPG_WEB ../EZPG/apps/EZPG_ADMIN}"
npm run build
for APP in $APPS; do
  (cd "$APP" && npx tsc --noEmit && API_URL="${API_URL:-http://localhost:8001}" PROXY_SECRET="${PROXY_SECRET:-dev-only-secret-change-me}" npx next build)
done
