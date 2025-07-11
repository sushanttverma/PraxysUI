#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/release.sh 1.0.3
#
# This script bumps the CLI version in both places,
# commits, tags, and tells you the push command.

VERSION="${1:-}"

if [ -z "$VERSION" ]; then
  echo "Usage: ./scripts/release.sh <version>"
  echo "Example: ./scripts/release.sh 1.0.3"
  exit 1
fi

# Validate semver format
if ! echo "$VERSION" | grep -qE '^[0-9]+\.[0-9]+\.[0-9]+'; then
  echo "Error: Version must be semver (e.g. 1.0.3)"
  exit 1
fi

# Check for clean working tree
if [ -n "$(git status --porcelain)" ]; then
  echo "Error: Working tree is not clean. Commit or stash changes first."
  exit 1
fi

echo "Releasing v${VERSION}..."

# 1. Bump CLI package.json
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
echo "Done! Now push with:"
echo ""
echo "  git push origin main && git push origin v${VERSION}"
echo ""
