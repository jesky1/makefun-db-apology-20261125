import test from 'node:test';
import assert from 'node:assert/strict';
import { screenApology, APOLOGY_LINE } from './main.ts';

test('the real entry passes the screen', () => {
  assert.equal(screenApology(APOLOGY_LINE), null);
});

test('201 characters is rejected', () => {
  assert.notEqual(screenApology('word '.repeat(40) + 'x'), null);
});

test('exactly 200 characters is accepted', () => {
  assert.equal(screenApology('word '.repeat(39) + 'words'), null);
});

test('whitespace-only is rejected', () => {
  assert.notEqual(screenApology('   '), null);
});

test('empty string is rejected', () => {
  assert.notEqual(screenApology(''), null);
});

test('multi-line text is rejected', () => {
  assert.notEqual(screenApology('sorry\nI deleted it'), null);
  assert.notEqual(screenApology('sorry\rI deleted it'), null);
});

test('trailing whitespace is rejected', () => {
  assert.notEqual(screenApology('sorry I deleted the database '), null);
  assert.notEqual(screenApology('sorry I deleted the database\t'), null);
});

test('control characters are rejected', () => {
  assert.notEqual(screenApology('sorry I deleted the database\x07'), null);
});

test('an entry with no letters is rejected', () => {
  assert.notEqual(screenApology('12345 !!!'), null);
});

test('links are rejected', () => {
  assert.notEqual(screenApology('sorry I deleted the database http://x.co'), null);
});

test('fewer than five words is rejected', () => {
  assert.notEqual(screenApology('sorry database gone'), null);
});
