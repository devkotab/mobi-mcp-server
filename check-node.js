#!/usr/bin/env node

// check-node.js - Simple Node version checker and launcher
const currentNodeVersion = process.versions.node;
const [major] = currentNodeVersion.split('.');
const requiredMajor = 18;

if (parseInt(major, 10) < requiredMajor) {
  console.error(`Error: This package requires Node.js version ${requiredMajor} or higher.`);
  console.error(`You are running Node.js ${currentNodeVersion}.`);
  console.error(`Please update your Node.js version and try again.`);
  process.exit(1);
}

// If Node version is OK, run the actual entry point
require('./cli.cjs');