import { Command } from "commander";
import { registerToolsCommand } from "./commands/tools.js"; // Assuming tools.js is also ESM

const program = new Command();

// Register commands
registerToolsCommand(program);

// Add a default command to run the server
program
  .command('server', { isDefault: true })
  .description('Start the MCP server (default when no command is specified)')
  .action(() => {
  });

// Parse arguments
program.parse(process.argv);

// Dynamically import and start the server logic
// This ensures mcpServer.js runs after command parsing, regardless of the command.
// If a command like 'tools' has its own logic and should prevent server start,
// you might need more conditional logic here.
if (program.args.includes('server') || program.args.length === 0) { // Or based on your desired logic
  import("./mcpServer.js").catch(err => {
    process.exit(1);
  });
}