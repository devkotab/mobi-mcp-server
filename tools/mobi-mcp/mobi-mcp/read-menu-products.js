import fetch from 'node-fetch';

/**
 * Function to read menu products from a specified head office.
 *
 * @param {Object} args - Arguments for the menu products request.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @returns {Promise<Object>} - The result of the menu products request.
 */
const executeFunction = async ({ headoffice }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with the head office path variable
    const url = `${baseUrl}/headoffice/${headoffice}/menu/products`;

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
      }
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
    return { error: 'An error occurred while reading menu products.' };
  }
};

/**
 * Tool configuration for reading menu products from a head office.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_menu_products',
      description: 'Read all menu products from a specified head office.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the head office.'
          }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };