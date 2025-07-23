#!/usr/bin/env npx tsx
/**
 * Generates CHANGELOG.md (project root) and packages/cli/CHANGELOG.md
 * from the single source of truth in data/changelog.ts.
 *
 * Usage:  npx tsx scripts/generate-changelog.ts
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { generateChangelogMarkdown } from '../data/changelog.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const md = generateChangelogMarkdown()

// Write to project root
const rootPath = resolve(root, 'CHANGELOG.md')
writeFileSync(rootPath, md, 'utf-8')
console.log(`✓ wrote ${rootPath}`)

// Write to CLI package (ships with npm)
const cliPath = resolve(root, 'packages/cli/CHANGELOG.md')
writeFileSync(cliPath, md, 'utf-8')
console.log(`✓ wrote ${cliPath}`)
