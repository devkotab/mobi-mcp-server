import fetch from 'node-fetch';

/**
 * Function to search for customer orders.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.customer - The Customer ID or email address.
 * @returns {Promise<Object>} - The result of the customer orders search.
 */
const executeFunction = async ({ headoffice, customer }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer}/orders`;

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
    return { error: 'An error occurred while searching for customer orders.' };
  }
};

/**
 * Tool configuration for searching customer orders.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_customer_orders',
      description: 'Search for customer orders based on HeadOffice and Customer ID.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          customer: {
            type: 'string',
            description: 'The Customer ID or email address.'
          }
        },
        required: ['headoffice', 'customer']
      }
    }
  }
};

export { apiTool };