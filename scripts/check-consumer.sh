#!/usr/bin/env bash
# Builds the package, then typechecks and builds EZPG_WEB against it.
# next build prerenders pages, so an EZPG API must be running at API_URL.
set -euo pipefail
cd "$(dirname "$0")/.."
APP="${EZPG_WEB:-../EZPG/apps/EZPG_WEB}"
npm run build
(cd "$APP" && npx tsc --noEmit && API_URL="${API_URL:-http://localhost:8001}" PROXY_SECRET="${PROXY_SECRET:-dev-only-secret-change-me}" npx next build)
