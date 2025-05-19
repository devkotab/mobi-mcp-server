/**
 * Function to read out of stock products for a specific location.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.location - The ID or name of the location.
 * @returns {Promise<Object>} - The response containing out of stock products.
 */
const executeFunction = async ({ headoffice, location }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/out_of_stocks/products`;

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
    return { error: 'An error occurred while reading out of stock products.' };
  }
};

/**
 * Tool configuration for reading out of stock products for a location.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_out_of_stock_products',
      description: 'Read out of stock products for a specific location.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
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