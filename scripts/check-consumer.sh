#!/usr/bin/env bash
# Builds the package, then typechecks and builds each consuming app against it.
# Neither app needs a running EZPG API, so API_URL defaults to a closed port.
set -euo pipefail
cd "$(dirname "$0")/.."
APPS="${EZPG_APPS:-../EZPG/apps/EZPG_WEB ../EZPG/apps/EZPG_ADMIN}"
npm run build
for APP in $APPS; do
  (cd "$APP" && npx tsc --noEmit && API_URL="${API_URL:-http://127.0.0.1:9}" PROXY_SECRET="${PROXY_SECRET:-dev-only-secret-change-me}" npx next build)
done
