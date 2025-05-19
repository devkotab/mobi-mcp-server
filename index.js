#!/usr/bin/env node
import { Command } from "commander";
import { registerToolsCommand } from "./commands/tools.js";

const program = new Command();

// Register commands
registerToolsCommand(program);

program.parse(process.argv);

import "./mcpServer.js";