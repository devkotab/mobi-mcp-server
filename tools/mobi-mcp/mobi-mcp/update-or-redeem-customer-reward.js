/**
 * Function to update or redeem a customer reward.
 *
 * @param {Object} args - Arguments for the update request.
 * @param {string} args.headoffice - The ID or name of the head office.
 * @param {string} args.customer_id - The ID or email address of the customer.
 * @param {Object} args.data - The data to be sent in the request body.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ headoffice, customer_id, data }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const url = `${baseUrl}/headoffice/${headoffice}/customers/${customer_id}/rewards`;
  const headers = {
    'Content-Type': 'application/json'
  };

  // Prepare the request body
  const requestBody = JSON.stringify(data || { attributes: "RewardRequest" });

  try {
    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: requestBody
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('Error updating or redeeming customer reward:', error);
    return { error: 'An error occurred while updating or redeeming the customer reward.' };
  }
};

/**
 * Tool configuration for updating or redeeming a customer reward.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_or_redeem_customer_reward',
      description: 'Update or redeem a customer reward.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the head office.'
          },
          customer_id: {
            type: 'string',
            description: 'The ID or email address of the customer.'
          },
          data: {
            type: 'object',
            description: 'The data to be sent in the request body.'
          }
        },
        required: ['headoffice', 'customer_id']
      }
    }
  }
};

export { apiTool };