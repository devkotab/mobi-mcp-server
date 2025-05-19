/**
 * Function to read menus from the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the menu retrieval.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @returns {Promise<Object>} - The result of the menu retrieval.
 */
const executeFunction = async ({ headoffice }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with the path variable
    const url = `${baseUrl}/headoffice/${headoffice}/menu/menus`;

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
    return { error: 'An error occurred while reading menus.' };
  }
};

/**
 * Tool configuration for reading menus from the Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_menus',
      description: 'Read all menus from the Mobi2Go API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };