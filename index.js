import { Command } from "commander";
import { registerToolsCommand } from "./commands/tools.js";

const program = new Command();

// Register commands
registerToolsCommand(program);

// Add a default command to run the server
program
  .command('server', { isDefault: true })
  .description('Start the MCP server (default when no command is specified)')
  .action(() => {
    // Will run the server by importing it below
    console.log("Starting MCP server...");
  });

// Parse arguments
program.parse(process.argv);

// Import server after parsing commands
// This will run regardless of which command was executed
import("./mcpServer.js").catch(err => {
  console.error("Failed to start MCP server:", err);
  process.exit(1);
});