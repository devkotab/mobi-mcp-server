#!/usr/bin/env node

// ES Module version of cli runner
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Directly execute mcpServer.js
const child = spawn(
  process.execPath, // Current Node executable
  [join(__dirname, 'mcpServer.js')], // Path to mcpServer.js
  { 
    stdio: 'inherit',
    env: process.env // Pass all environment variables
  }
);

child.on('close', (code) => {
  process.exit(code);
});