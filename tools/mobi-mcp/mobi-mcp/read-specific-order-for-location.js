import fetch from 'node-fetch';

/**
 * Function to read a specific order for a location.
 *
 * @param {Object} args - Arguments for the order retrieval.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.location - The ID or name of the location.
 * @param {string} args.id - The order ID.
 * @returns {Promise<Object>} - The result of the order retrieval.
 */
const executeFunction = async ({ headoffice, location, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/orders/${id}`;

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
    return { error: 'An error occurred while reading the order.' };
  }
};

/**
 * Tool configuration for reading a specific order for a location.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_specific_order',
      description: 'Read a specific order for a location.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the head office.'
          },
          location: {
            type: 'string',
            description: 'The ID or name of the location.'
          },
          id: {
            type: 'string',
            description: 'The order ID.'
          }
        },
        required: ['headoffice', 'location', 'id']
      }
    }
  }
};

export { apiTool };