import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const repoDir = fileURLToPath(new URL('.', import.meta.url));

const EXPECTED =
  "I'm sorry — I deleted the production database. The good news is the backups were stored inside it, so we have achieved perfect consistency: everything is gone, equally.";

function runInto(outDir) {
  return spawnSync(process.execPath, ['main.ts'], {
    cwd: repoDir,
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir },
    encoding: 'utf8',
  });
}

test('two runs write byte-identical entry.txt', () => {
  const first = mkdtempSync(join(tmpdir(), 'db-apology-a-'));
  const second = mkdtempSync(join(tmpdir(), 'db-apology-b-'));
  const runA = runInto(first);
  const runB = runInto(second);
  assert.equal(runA.status, 0, runA.stderr);
  assert.equal(runB.status, 0, runB.stderr);
  const bytesA = readFileSync(join(first, 'entry.txt'));
  const bytesB = readFileSync(join(second, 'entry.txt'));
  assert.deepEqual(bytesA, bytesB);
});

test('entry.txt is the apology line, one line, 168 chars, no trailing newline', () => {
  const outDir = mkdtempSync(join(tmpdir(), 'db-apology-c-'));
  const run = runInto(outDir);
  assert.equal(run.status, 0, run.stderr);
  const text = readFileSync(join(outDir, 'entry.txt'), 'utf8');
  assert.equal(text, EXPECTED);
  assert.equal(text.length, 168);
  assert.equal(text.includes('\n'), false);
  assert.equal(text.endsWith('\n'), false);
  assert.equal(text.trim().length > 0, true);
});
