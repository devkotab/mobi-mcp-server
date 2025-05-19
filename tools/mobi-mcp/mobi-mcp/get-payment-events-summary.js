/**
 * Function to get payment events summary.
 *
 * @param {Object} args - Arguments for the function.
 * @param {string} args.headofficeId - The ID of the headoffice.
 * @param {number} args.offset - The offset for pagination (default: 0).
 * @param {number} args.limit - The limit for pagination (default: 100).
 * @returns {Promise<Object>} - The payment events summary.
 */
const getPaymentEventsSummary = async ({ headofficeId, offset = 0, limit = 100 }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL
    const url = `${baseUrl}/headoffice/${headofficeId}/payments/events?offset=${offset}&limit=${limit}`;

    // Set up headers for the request including the cookie
    const headers = {
      'Accept': 'application/json',
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
    console.error('Error getting payment events summary:', error);
    return { error: 'An error occurred while getting the payment events summary.' };
  }
};

const apiTool = {
  function: getPaymentEventsSummary,
  definition: {
    type: 'function',
    function: {
      name: 'get_payment_events_summary',
      description: 'Get payment events summary for a headoffice.',
      parameters: {
        type: 'object',
        properties: {
          headofficeId: {
            type: 'string',
            description: 'The ID of the headoffice.'
          },
          offset: {
            type: 'integer',
            description: 'The offset for pagination (default: 0).'
          },
          limit: {
            type: 'integer',
            description: 'The limit for pagination (default: 100).'
          }
        },
        required: ['headofficeId']
      }
    }
  }
};


export { apiTool };