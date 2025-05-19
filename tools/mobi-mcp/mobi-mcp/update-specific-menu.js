/**
 * Function to update a specific menu in the MOBI MCP API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.headoffice - The ID or name of the HeadOffice.
 * @param {string} args.id - The ID of the Menu to update.
 * @param {Object} args.attributes - The attributes to update for the Menu.
 * @returns {Promise<Object>} - The result of the menu update.
 */
const executeFunction = async ({ headoffice, id, attributes }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/menu/menus/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Prepare the request body
    const body = JSON.stringify({ attributes });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body,
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
    console.error('Error updating the menu:', error);
    return { error: 'An error occurred while updating the menu.' };
  }
};

/**
 * Tool configuration for updating a specific menu in the MOBI MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_menu',
      description: 'Update a specific menu in the MOBI MCP API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the HeadOffice.'
          },
          id: {
            type: 'string',
            description: 'The ID of the Menu to update.'
          },
          attributes: {
            type: 'object',
            description: 'The attributes to update for the Menu.'
          }
        },
        required: ['headoffice', 'id', 'attributes']
      }
    }
  }
};

export { apiTool };