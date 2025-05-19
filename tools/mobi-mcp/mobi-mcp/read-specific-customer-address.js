/**
 * Function to read a specific customer address from the MOBI MCP API.
 *
 * @param {Object} args - Arguments for the address retrieval.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.customer - The ID or email of the customer.
 * @param {string} args.id - The ID of the address to retrieve.
 * @returns {Promise<Object>} - The result of the address retrieval.
 */
const executeFunction = async ({ headoffice, customer, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer}/addresses/${id}`;

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
      }
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
    console.error('Error reading customer address:', error);
    return { error: 'An error occurred while reading the customer address.' };
  }
};

/**
 * Tool configuration for reading a specific customer address from the MOBI MCP API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_customer_address',
      description: 'Read a specific customer address from the MOBI MCP API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the head office.'
          },
          customer: {
            type: 'string',
            description: 'The ID or email of the customer.'
          },
          id: {
            type: 'string',
            description: 'The ID of the address to retrieve.'
          }
        },
        required: ['headoffice', 'customer', 'id']
      }
    }
  }
};

export { apiTool };