import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

export const APOLOGY_LINE =
  "I'm sorry — I deleted the production database. The good news is the backups were stored inside it, so we have achieved perfect consistency: everything is gone, equally.";

const MAX_CHARS = 200;
const MIN_WORDS = 5;

// Returns null when the line passes every gate, otherwise a short reason.
export function screenApology(line: string): string | null {
  if (line.length < 1 || line.length > MAX_CHARS) {
    return `length ${line.length} outside 1-${MAX_CHARS}`;
  }
  if (line.trim().length === 0) return 'blank entry';
  if (line.includes('\n') || line.includes('\r')) return 'must be one line';
  if (/[\u0000-\u001f\u007f]/.test(line)) return 'control character found';
  if (/[\u200b-\u200f\ufeff]/.test(line)) return 'invisible character found';
  if (!/[A-Za-z]/.test(line)) return 'no letters';
  if (line.trim() !== line) return 'leading or trailing whitespace';
  if (line.toLowerCase().includes('http')) return 'links not allowed';
  if (line.split(/\s+/).length < MIN_WORDS) {
    return `fewer than ${MIN_WORDS} words`;
  }
  return null;
}

function resolveOutDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
}

function emitEntry(): void {
  const problem = screenApology(APOLOGY_LINE);
  if (problem !== null) throw new Error(`entry rejected: ${problem}`);
  const dir = resolveOutDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'entry.txt'), APOLOGY_LINE, 'utf8');
}

const invokedAsScript =
  process.argv[1] !== undefined && process.argv[1].endsWith('main.ts');
if (invokedAsScript) emitEntry();
