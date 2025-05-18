/**
 * Function to delete a customer from the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.customer - The ID or email of the customer to delete.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ headoffice, customer }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const token = process.env.MOBI_MCP_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'DELETE',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Return the response data
    return { status: response.status, message: 'Customer deleted successfully.' };
  } catch (error) {
    console.error('Error deleting customer:', error);
    return { error: 'An error occurred while deleting the customer.' };
  }
};

/**
 * Tool configuration for deleting a customer from the Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_customer',
      description: 'Delete a customer from the Mobi2Go API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the head office.'
          },
          customer: {
            type: 'string',
            description: 'The ID or email of the customer to delete.'
          }
        },
        required: ['headoffice', 'customer']
      }
    }
  }
};

export { apiTool };