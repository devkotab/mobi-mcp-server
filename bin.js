#!/usr/bin/env node

// Use CommonJS in this wrapper file to avoid ES module import issues
const { spawn } = require('child_process');
const path = require('path');

// Run the actual index.js with node
const child = spawn('node', [path.join(__dirname, 'index.js'), ...process.argv.slice(2)], {
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code);
});