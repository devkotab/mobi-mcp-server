#!/usr/bin/env node

// This is a simple CommonJS entry point for npx
require('child_process').spawn(
  process.execPath, // Use the current Node executable
  [require('path').join(__dirname, 'mcpServer.js')], // Directly run mcpServer.js
  { stdio: 'inherit', env: { ...process.env } }
).on('close', code => process.exit(code));