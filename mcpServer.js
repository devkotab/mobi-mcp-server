#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { name, version } from "../package.json";
import { apiTool } from "./lib/tools/headoffices.js";

// Determine the MOBI_COOKIE
let mobiCookie = process.env.MOBI_COOKIE;

// Support CLI argument like: MOBI_COOKIE=your_token
if (process.argv.length === 3) {
  const [envVar, token] = String(process.argv[2]).split("=");
  if (envVar === "MOBI_COOKIE") mobiCookie = token;
}

// Fail fast if no cookie
if (!mobiCookie) {
  console.error("❌ MOBI_COOKIE is required. Provide it as an env var or argument.");
  process.exit(1);
}

// Inject the cookie into the tool
apiTool.function = apiTool.functionFactory(mobiCookie);

// Create the MCP server
const server = new McpServer({ name, version });
server.registerTool(apiTool);

// Launch the server with stdio transport
async function startServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("Fatal:", error);
    process.exit(1);
  }
}

startServer();
