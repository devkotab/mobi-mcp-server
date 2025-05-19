import fetch from 'node-fetch';

/**
 * Function to get locations permissions for the account.
 *
 * @returns {Promise<Object>} - The result of the locations permissions request.
 */
const executeFunction = async () => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    // Construct the URL for the request
    const url = `${baseUrl}/account/locations`;

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
    return { error: 'An error occurred while getting locations permissions.' };
  }
};

/**
 * Tool configuration for getting locations permissions.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_locations_permissions',
      description: 'Get locations that the account has permissions for.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };