#!/usr/bin/env node
const split = require('split')
const [ domain ] = process.argv.slice(2)

if (!domain || !domain.startsWith('http')) {
  throw new Error(`expected domain as first argument, got ${domain}`)
}

const extendUris = line => {
  return line

  // Subjects
  .replace(/^wd:([^\s,;]+)/, `<${domain}/entity/$1>`)
  .replace(/^wds:([^\s,;]+)/, `<${domain}/entity/statement/$1>`)
  .replace(/^wdv:([^\s,;]+)/, `<${domain}/value/$1>`)
  .replace(/^wdt:([^\s,;]+)/, `<${domain}/prop/direct/$1>`)
  .replace(/^p:([^\s,;]+)/, `<${domain}/prop/$1>`)
  .replace(/^ps:([^\s,;]+)/, `<${domain}/prop/statement/$1>`)
  .replace(/^pq:([^\s,;]+)/, `<${domain}/prop/qualifier/$1>`)
  .replace(/^wdref:([^\s,;]+)/, `<${domain}/reference/$1>`)
  .replace(/^psv:([^\s,;]+)/, `<${domain}/prop/statement/value/$1>`)
  .replace(/^psn:([^\s,;]+)/, `<${domain}/prop/statement/value-normalized/$1>`)
  .replace(/^pqv:([^\s,;]+)/, `<${domain}/prop/qualifier/value/$1>`)
  .replace(/^pqn:([^\s,;]+)/, `<${domain}/prop/qualifier/value-normalized/$1>`)
  .replace(/^pr:([^\s,;]+)/, `<${domain}/prop/reference/$1>`)
  .replace(/^prv:([^\s,;]+)/, `<${domain}/prop/reference/value/$1>`)
  .replace(/^prn:([^\s,;]+)/, `<${domain}/prop/reference/value-normalized/$1>`)
  .replace(/^wdno:([^\s,;]+)/, `<${domain}/prop/novalue/$1>`)
  .replace(/^wdata:([^\s,;]+)/, `<${domain}/wiki/Special:EntityData/$1>`)

  // Properties and objects
  .replace(/(\s+)wd:([^\s,;]+)/, `$1<${domain}/entity/$2>`)
  .replace(/(\s+)wds:([^\s,;]+)/, `$1<${domain}/entity/statement/$2>`)
  .replace(/(\s+)wdv:([^\s,;]+)/, `$1<${domain}/value/$2>`)
  .replace(/(\s+)wdt:([^\s,;]+)/, `$1<${domain}/prop/direct/$2>`)
  .replace(/(\s+)p:([^\s,;]+)/, `$1<${domain}/prop/$2>`)
  .replace(/(\s+)ps:([^\s,;]+)/, `$1<${domain}/prop/statement/$2>`)
  .replace(/(\s+)pq:([^\s,;]+)/, `$1<${domain}/prop/qualifier/$2>`)
  .replace(/(\s+)wdref:([^\s,;]+)/, `$1<${domain}/reference/$2>`)
  .replace(/(\s+)psv:([^\s,;]+)/, `$1<${domain}/prop/statement/value/$2>`)
  .replace(/(\s+)psn:([^\s,;]+)/, `$1<${domain}/prop/statement/value-normalized/$2>`)
  .replace(/(\s+)pqv:([^\s,;]+)/, `$1<${domain}/prop/qualifier/value/$2>`)
  .replace(/(\s+)pqn:([^\s,;]+)/, `$1<${domain}/prop/qualifier/value-normalized/$2>`)
  .replace(/(\s+)pr:([^\s,;]+)/, `$1<${domain}/prop/reference/$2>`)
  .replace(/(\s+)prv:([^\s,;]+)/, `$1<${domain}/prop/reference/value/$2>`)
  .replace(/(\s+)prn:([^\s,;]+)/, `$1<${domain}/prop/reference/value-normalized/$2>`)
  .replace(/(\s+)wdno:([^\s,;]+)/, `$1<${domain}/prop/novalue/$2>`)
  .replace(/(\s+)wdata:([^\s,;]+)/, `$1<${domain}/wiki/Special:EntityData/$2>`)
}

process.stdin
.pipe(split())
.on('data', line => console.log(extendUris(line)))
.on('error', console.error)
