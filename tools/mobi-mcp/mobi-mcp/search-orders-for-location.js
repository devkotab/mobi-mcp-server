/**
 * Function to search orders for a specific location at a head office.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.location - The ID or name of the location.
 * @returns {Promise<Object>} - The result of the order search.
 */
const executeFunction = async ({ headoffice, location }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/orders`;

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
    console.error('Error searching for orders:', error);
    return { error: 'An error occurred while searching for orders.' };
  }
};

/**
 * Tool configuration for searching orders for a location at a head office.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_orders_for_location',
      description: 'Search for orders for a specific location at a head office.',
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
          }
        },
        required: ['headoffice', 'location']
      }
    }
  }
};

export { apiTool };