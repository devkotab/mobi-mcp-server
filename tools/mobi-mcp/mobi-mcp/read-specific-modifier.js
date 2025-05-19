/**
 * Function to read a specific modifier by ID from the MOBI MCP API.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The ID of the HeadOffice.
 * @param {string} args.id - The ID of the Modifier.
 * @returns {Promise<Object>} - The response from the API containing the modifier details.
 */
const executeFunction = async ({ headoffice, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/menu/modifiers/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error reading modifier:', error);
    return { error: 'An error occurred while reading the modifier.' };
  }
};

/**
 * Tool configuration for reading a specific modifier from the MOBI MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_specific_modifier',
      description: 'Read a specific modifier by ID from the MOBI MCP API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID of the HeadOffice.'
          },
          id: {
            type: 'string',
            description: 'The ID of the Modifier.'
          }
        },
        required: ['headoffice', 'id']
      }
    }
  }
};

export { apiTool };