/**
 * Function to create a new customer for the headoffice.
 *
 * @param {Object} args - Arguments for creating a customer.
 * @param {string} args.headoffice - The ID of the headoffice.
 * @param {Object} args.customerData - The data for the new customer.
 * @returns {Promise<Object>} - The result of the customer creation.
 */
const executeFunction = async ({ headoffice, customerData }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  const requestBody = JSON.stringify(customerData);
  
  try {
    // Construct the URL with the headoffice path variable
    const url = `${baseUrl}/headoffice/${headoffice}/customers`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: requestBody
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
    return { error: 'An error occurred while creating the customer.' };
  }
};

/**
 * Tool configuration for creating a customer.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_customer',
      description: 'Create a new customer for the headoffice.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID of the headoffice.'
          },
          customerData: {
            type: 'object',
            description: 'The data for the new customer.'
          }
        },
        required: ['headoffice', 'customerData']
      }
    }
  }
};

export { apiTool };