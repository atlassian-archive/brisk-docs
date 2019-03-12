#!/usr/bin/env node
const { spawnSync } = require('child_process');
const generatePages = require('./generate-pages');

generatePages();

// Start the next dev server
spawnSync('PATH=$(npm bin):$PATH; NODE_PATH=$NODE_PATH:$PWD/src next dev', [], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, FORCE_EXTRACT_REACT_TYPES: true },
  cwd: __dirname,
});
