/**
 * Function to delete a specific customer address.
 *
 * @param {Object} args - Arguments for the deletion.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.customer - The ID or email of the customer.
 * @param {string} args.id - The ID of the address to be deleted.
 * @returns {Promise<Object>} - The result of the deletion operation.
 */
const executeFunction = async ({ headoffice, customer, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const token = process.env.MOBI_MCP_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer}/addresses/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
    };

    // If a token is provided, add it to the Authorization header
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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

    // Return a success message or the response data
    return { message: 'Address deleted successfully', status: response.status };
  } catch (error) {
    console.error('Error deleting customer address:', error);
    return { error: 'An error occurred while deleting the customer address.' };
  }
};

/**
 * Tool configuration for deleting a specific customer address.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_customer_address',
      description: 'Delete a specific customer address.',
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
            description: 'The ID of the address to be deleted.'
          }
        },
        required: ['headoffice', 'customer', 'id']
      }
    }
  }
};

export { apiTool };