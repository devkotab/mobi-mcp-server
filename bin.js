#!/usr/bin/env node

// This is a wrapper script that will properly invoke your ES module
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Run the actual index.js with node
const child = spawn('node', [join(__dirname, 'index.js'), ...process.argv.slice(2)], {
  stdio: 'inherit'
});

child.on('close', (code) => {
  process.exit(code);
});