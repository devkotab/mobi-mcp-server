/**
 * Function to delete a customer session (logout) from the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the logout request.
 * @param {string} args.headoffice - The ID of the head office for which to log out the customer.
 * @returns {Promise<Object>} - The result of the logout operation.
 */
const executeFunction = async ({ headoffice }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const token = process.env.MOBI_MCP_API_KEY;
  try {
    // Construct the URL for the DELETE request
    const url = `${baseUrl}/headoffice/${headoffice}/customers/session`;

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

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error logging out customer session:', error);
    return { error: 'An error occurred while logging out the customer session.' };
  }
};

/**
 * Tool configuration for deleting a customer session (logout) from Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_customer_session',
      description: 'Delete a customer session (logout) from Mobi2Go API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID of the head office for which to log out the customer.'
          }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };