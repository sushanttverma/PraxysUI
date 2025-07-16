#!/usr/bin/env bash
set -euo pipefail

# ─── Praxys UI Release Script ────────────────────────────
#
# Full release flow:
#   npm run release 1.0.4
#
# That's it. This script handles everything else and tells
# you what to do next.
# ──────────────────────────────────────────────────────────

# Show current version if no arg given
CURRENT=$(grep '"version"' packages/cli/package.json | head -1 | sed 's/.*: "\(.*\)".*/\1/')

VERSION="${1:-}"

if [ -z "$VERSION" ]; then
  echo ""
  echo "  Current CLI version: v${CURRENT}"
  echo ""
  echo "  Usage:  npm run release <new-version>"
  echo ""
  echo "  Examples:"
  echo "    npm run release ${CURRENT%.*}.$((${CURRENT##*.} + 1))   # patch (bug fixes)"
  echo "    npm run release ${CURRENT%%.*}.$((${CURRENT#*.} + 1)).0           # minor (new components)"
  echo ""
  exit 1
fi

# Validate semver format
if ! echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "Error: Version must be semver (e.g. 1.0.4)"
  exit 1
fi

# Check we're on main
BRANCH=$(git branch --show-current)
if [ "$BRANCH" != "main" ]; then
  echo "Error: You're on '${BRANCH}'. Switch to main first:"
  echo "  git checkout main"
  exit 1
fi

# Check for clean working tree
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working tree is not clean. Commit or stash changes first."
  echo ""
  git status --short
  exit 1
fi

# Check we're up to date with remote
git fetch origin main --quiet 2>/dev/null || true
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main 2>/dev/null || echo "$LOCAL")
if [ "$LOCAL" != "$REMOTE" ]; then
  echo "Error: Local main is behind remote. Pull first:"
  echo "  git pull origin main"
  exit 1
fi

echo ""
echo "  Releasing v${CURRENT} → v${VERSION}..."
echo ""

# 1. Bump CLI package.json version
sed -i.bak "s/\"version\": \".*\"/\"version\": \"${VERSION}\"/" packages/cli/package.json
rm -f packages/cli/package.json.bak

# 2. Bump VERSION constant in CLI source
sed -i.bak "s/const VERSION = \".*\"/const VERSION = \"${VERSION}\"/" packages/cli/src/index.ts
rm -f packages/cli/src/index.ts.bak

# 3. Commit
git add packages/cli/package.json packages/cli/src/index.ts
git commit -m "chore: release v${VERSION}"

# 4. Tag
git tag -a "v${VERSION}" -m "v${VERSION}"

echo ""
echo "  ✓ Version bumped (package.json + source)"
echo "  ✓ Committed"
echo "  ✓ Tagged v${VERSION}"
echo ""
echo "  Now push:"
echo ""
echo "    git push origin main && git push origin v${VERSION}"
echo ""
echo "  What happens next:"
echo "    1. CI runs lint + type check + build"
echo "    2. GitHub Release is created automatically"
echo "    3. CLI v${VERSION} is published to npm"
echo ""
