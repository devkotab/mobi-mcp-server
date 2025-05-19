import fetch from 'node-fetch';

/**
 * Function to create a new delivery address for a customer.
 *
 * @param {Object} args - Arguments for creating the address.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.customer - The ID or email of the customer.
 * @param {Object} args.attributes - The attributes for the address.
 * @returns {Promise<Object>} - The result of the address creation.
 */
const executeFunction = async ({ headoffice, customer, attributes }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer}/addresses`;
  
  try {
    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Prepare the request body
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
    return { error: 'An error occurred while creating the customer address.' };
  }
};

/**
 * Tool configuration for creating a customer address.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_customer_address',
      description: 'Create a new delivery address for a customer.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          customer: {
            type: 'string',
            description: 'The ID or email of the customer.'
          },
          attributes: {
            type: 'object',
            description: 'The attributes for the address.'
          }
        },
        required: ['headoffice', 'customer', 'attributes']
      }
    }
  }
};

export { apiTool };