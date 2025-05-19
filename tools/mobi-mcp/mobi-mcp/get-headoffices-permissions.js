/**
 * Tool to get headoffices permissions for the account.
 * Returns a tool definition compatible with the MCP server.
 */

const getHeadOfficesTool = (cookie) => ({
  function: async () => {
    const baseUrl = "https://www.mobi2go.com/api/1";
    const url = `${baseUrl}/account/headoffices`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cookie": `MOBI2GO_ADMIN=${cookie}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        error: `Failed to get head offices: ${error.message}`,
      };
    }
  },

  definition: {
    type: "function",
    function: {
      name: "get_headoffices_permissions",
      description: "Get headoffices that the account has permissions for.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
});

// Factory wrapper to inject the token into the function
const apiTool = {
  functionFactory: (cookie) => getHeadOfficesTool(cookie).function,
  definition: getHeadOfficesTool("placeholder").definition,
};

export { apiTool };
