#!/usr/bin/env npx tsx
/**
 * Cross-platform release script (replaces release.sh).
 *
 * Usage:  npm run release <new-version>
 *   e.g.  npm run release 1.3.6
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

// ─── Helpers ────────────────────────────────────────────

function run(cmd: string, opts: { silent?: boolean } = {}): string {
  return execSync(cmd, {
    cwd: root,
    stdio: opts.silent ? 'pipe' : 'inherit',
    encoding: 'utf8',
  }) as string
}

function runCapture(cmd: string): string {
  return (execSync(cmd, { cwd: root, encoding: 'utf8' }) as string).trim()
}

// ─── Read current CLI version ────────────────────────────

const cliPkgPath = resolve(root, 'packages/cli/package.json')
const cliPkg = JSON.parse(readFileSync(cliPkgPath, 'utf8'))
const CURRENT: string = cliPkg.version
const [maj, min, pat] = CURRENT.split('.').map(Number)

// ─── Parse arg ───────────────────────────────────────────

const VERSION = process.argv[2]?.trim()

if (!VERSION) {
  console.log()
  console.log(`  Current CLI version: v${CURRENT}`)
  console.log()
  console.log(`  Usage:  npm run release <new-version>`)
  console.log()
  console.log(`  Examples:`)
  console.log(`    npm run release ${maj}.${min}.${pat + 1}   # patch (bug fixes)`)
  console.log(`    npm run release ${maj}.${min + 1}.0           # minor (new components)`)
  console.log()
  process.exit(1)
}

// ─── Validate semver ─────────────────────────────────────

if (!/^\d+\.\d+\.\d+$/.test(VERSION)) {
  console.error('Error: Version must be semver (e.g. 1.3.6)')
  process.exit(1)
}

// ─── Must be on main ─────────────────────────────────────

const branch = runCapture('git branch --show-current')
if (branch !== 'main') {
  console.error(`Error: You're on '${branch}'. Switch to main first:`)
  console.error(`  git checkout main`)
  process.exit(1)
}

// ─── Must have clean working tree ────────────────────────

const dirty = runCapture('git status --porcelain')
if (dirty) {
  console.error('Error: Working tree is not clean. Commit or stash changes first.')
  console.error()
  console.log(runCapture('git status --short'))
  process.exit(1)
}

// ─── Must be up to date with remote ──────────────────────

try { run('git fetch origin main --quiet', { silent: true }) } catch { /* no remote — OK */ }

try { runCapture('git rev-parse origin/main') } catch { /* no remote — OK */ }

const behind = runCapture('git rev-list HEAD..origin/main --count')
if (parseInt(behind, 10) > 0) {
  console.error('Error: Local main is behind remote. Pull first:')
  console.error('  git pull origin main')
  process.exit(1)
}

// ─── Do the release ──────────────────────────────────────

console.log()
console.log(`  Releasing v${CURRENT} → v${VERSION}...`)
console.log()

// 0. Lint + type check
console.log('  Running lint...')
try {
  run('npx eslint')
} catch {
  console.error('Error: Lint failed. Fix errors before releasing.')
  process.exit(1)
}
console.log('  Running type check...')
try {
  run('npx tsc --noEmit')
} catch {
  console.error('Error: Type check failed. Fix errors before releasing.')
  process.exit(1)
}
console.log()

// 1. Bump packages/cli/package.json
cliPkg.version = VERSION
writeFileSync(cliPkgPath, JSON.stringify(cliPkg, null, 2) + '\n')

// 2. Bump VERSION constant in CLI source
const cliSrcPath = resolve(root, 'packages/cli/src/index.ts')
const cliSrc = readFileSync(cliSrcPath, 'utf8')
const updatedSrc = cliSrc.replace(
  /const VERSION = "[^"]*"/,
  `const VERSION = "${VERSION}"`
)
if (updatedSrc === cliSrc) {
  console.error('Error: Could not find `const VERSION = "..."` in packages/cli/src/index.ts')
  process.exit(1)
}
writeFileSync(cliSrcPath, updatedSrc)

// 3. Regenerate CHANGELOG.md
try {
  run('npx tsx scripts/generate-changelog.ts')
  run('git add CHANGELOG.md', { silent: true })
} catch {
  // Not fatal — changelog generation is best-effort
}

// 4. Commit
run('git add packages/cli/package.json packages/cli/src/index.ts', { silent: true })
run(`git commit -m "chore: release v${VERSION}"`)

// 5. Tag
run(`git tag -a "v${VERSION}" -m "v${VERSION}"`, { silent: true })

// ─── Done ────────────────────────────────────────────────

console.log()
console.log(`  ✓ Version bumped  (packages/cli/package.json + src/index.ts)`)
console.log(`  ✓ Committed`)
console.log(`  ✓ Tagged v${VERSION}`)
console.log()
console.log(`  Now push:`)
console.log()
console.log(`    git push origin main && git push origin v${VERSION}`)
console.log()
console.log(`  What happens next:`)
console.log(`    1. CI runs lint + type check + build`)
console.log(`    2. GitHub Release is created automatically`)
console.log(`    3. CLI v${VERSION} is published to npm`)
console.log()
