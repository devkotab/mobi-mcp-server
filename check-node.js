#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ES Module way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to your main application script (which uses Commander)
const mainScript = join(__dirname, 'index.js');

const args = [
  mainScript, // The script to run
  ...process.argv.slice(2) // Pass along any arguments given to mobi-mcp-server
];

const child = spawn(
  process.execPath, // This is the path to the current 'node' executable
  args,
  {
    stdio: 'inherit', // Share stdin/stdout/stderr with the parent process
    env: process.env  // Inherit environment variables
  }
);

child.on('error', (err) => {
  console.error(`[mobi-mcp-server] Failed to start child process: ${err.message}`);
  process.exit(1);
});

child.on('close', (code) => {
  // Exit with the same code as the child process
  if (code !== null) {
    process.exit(code);
  } else {
    // If code is null, it might mean the process was killed externally
    process.exit(1); // Default to an error code
  }
});