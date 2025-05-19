/**
 * Function to get sales metrics for a specific location.
 *
 * @param {Object} args - Arguments for the sales metrics request.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.location - The ID or name of the location.
 * @returns {Promise<Object>} - The sales metrics data for the specified location.
 */
const executeFunction = async ({ headoffice, location }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/orders/metrics`;

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
    console.error('Error getting sales metrics:', error);
    return { error: 'An error occurred while getting sales metrics.' };
  }
};

/**
 * Tool configuration for getting sales metrics for a location.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_sales_metrics',
      description: 'Get sales metrics for a specific location.',
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