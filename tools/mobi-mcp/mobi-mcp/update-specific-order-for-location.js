/**
 * Function to update a specific order for a location in the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the order update.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.location - The Location ID or name.
 * @param {string} args.id - The Order ID.
 * @param {Object} args.attributes - The attributes to update for the order.
 * @returns {Promise<Object>} - The result of the order update.
 */
const executeFunction = async ({ headoffice, location, id, attributes }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/orders/${id}`;
  const headers = {
    'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
  };
  
  const body = JSON.stringify({ attributes });

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
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
    console.error('Error updating order:', error);
    return { error: 'An error occurred while updating the order.' };
  }
};

/**
 * Tool configuration for updating a specific order for a location in the Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_order',
      description: 'Update a specific order for a location in the Mobi2Go API.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          location: {
            type: 'string',
            description: 'The Location ID or name.'
          },
          id: {
            type: 'string',
            description: 'The Order ID.'
          },
          attributes: {
            type: 'object',
            description: 'The attributes to update for the order.'
          }
        },
        required: ['headoffice', 'location', 'id', 'attributes']
      }
    }
  }
};

export { apiTool };