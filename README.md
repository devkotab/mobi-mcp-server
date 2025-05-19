# MOBI MCP Server

An MCP (Model Context Protocol) server that provides access to MOBI API tools through Claude.

## Installation & Setup

You don't need to install this package globally. It can be run directly through the Claude MCP configuration.

### Claude MCP Configuration

To use this MCP server with Claude, add the following configuration to your Claude MCP settings:

```json
{
  "mcpServers": {
    "mobi-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "github:devkotab/mobi-mcp-server"
      ],
      "env": {
        "MOBI_COOKIE": "your_mobi_cookie_here"
      }
    }
  }
}
```

### Follow logs in real-time for Claude
tail -n 20 -F ~/Library/Logs/Claude/mcp*.log