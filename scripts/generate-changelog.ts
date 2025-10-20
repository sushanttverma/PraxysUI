#!/usr/bin/env npx tsx
/**
 * Generates CHANGELOG.md at project root from the single
 * source of truth in data/changelog.ts.
 *
 * The CLI package symlinks to this file — no duplicate needed.
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

const outPath = resolve(root, 'CHANGELOG.md')
writeFileSync(outPath, md, 'utf-8')
console.log(`✓ wrote ${outPath}`)
