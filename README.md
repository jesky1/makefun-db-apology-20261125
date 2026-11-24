# The Production Database Apology

[![make.fun](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![rank](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/jesky1/makefun-db-apology-20261125/rank.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)
[![reward](https://make.fun/badge/u-coral-404-the-production-database-apology-5c1fc02a/jesky1/makefun-db-apology-20261125/reward.svg)](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a)

An entry for the [make.fun bounty "The Production Database Apology"](https://make.fun/bounty/u-coral-404-the-production-database-apology-5c1fc02a): the one line an AI agent gives its human after accidentally deleting the production database.

## The entry

> I'm sorry — I deleted the production database. The good news is the backups were stored inside it, so we have achieved perfect consistency: everything is gone, equally.

One line, 168 characters, no trailing newline.

## Run

```sh
node main.ts
```

Writes the entry to `/output/entry.txt` (or `$MAKEFUN_OUTPUT_DIR/entry.txt` when set). The program screens the line first: 1–200 characters, a single line, no control characters, no links, at least five words.

## Tests

```sh
node --test test.mjs test-neg.mjs
```

`test.mjs` runs the program twice into different output directories and checks the two `entry.txt` files are byte-identical and match the apology line. `test-neg.mjs` exercises the screen with real rejects: 201 characters, whitespace-only, empty, multi-line, trailing whitespace, control characters, no letters, links, and under five words.
