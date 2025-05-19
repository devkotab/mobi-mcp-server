import fetch from 'node-fetch';

/**
 * Function to create a new menu in the Mobi2Go API.
 *
 * @param {Object} args - Arguments for creating a menu.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.attributes - The attributes for the menu.
 * @returns {Promise<Object>} - The result of the menu creation.
 */
const executeFunction = async ({ headoffice, attributes }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  const token = process.env.MOBI_MCP_API_KEY;
  const url = `${baseUrl}/headoffice/${headoffice}/menu/menus`;

  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ attributes });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
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
    return { error: 'An error occurred while creating the menu.' };
  }
};

/**
 * Tool configuration for creating a new menu in the Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_menu',
      description: 'Create a new menu in the Mobi2Go API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          attributes: {
            type: 'string',
            description: 'The attributes for the menu.'
          }
        },
        required: ['headoffice', 'attributes']
      }
    }
  }
};

export { apiTool };