/**
 * Function to create a new API key for accessing the account.
 *
 * @param {Object} args - Arguments for creating the API key.
 * @param {number} args.ttl - The time-to-live for the API key in seconds.
 * @returns {Promise<Object>} - The result of the API key creation.
 */
const executeFunction = async ({ ttl }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL for the API key creation
    const url = `${baseUrl}/account/keys`;

    // Set up headers for the request including the cookie
    const headers = {
      'Content-Type': 'application/json',
     'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Create the request body
    const body = JSON.stringify({ ttl });

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
    console.error('Error creating API key:', error);
    return { error: 'An error occurred while creating the API key.' };
  }
};

/**
 * Tool configuration for creating an API key.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_api_key',
      description: 'Create a new API key for accessing the account.',
      parameters: {
        type: 'object',
        properties: {
          ttl: {
            type: 'integer',
            description: 'The time-to-live for the API key in seconds.'
          }
        },
        required: ['ttl']
      }
    }
  }
};

export { apiTool };