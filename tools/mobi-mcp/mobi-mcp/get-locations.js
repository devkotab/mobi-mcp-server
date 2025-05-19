import fetch from 'node-fetch';

/**
 * Function to get all locations for a headoffice.
 *
 * @param {Object} args - Arguments for the function.
 * @param {string} args.headofficeId - The ID of the headoffice.
 * @returns {Promise<Object>} - The locations data.
 */
const getLocationsForHeadoffice = async ({ headofficeId }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    // Construct the URL
    const url = `${baseUrl}/headoffice/${headofficeId}/locations`;

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
    return { error: 'An error occurred while getting locations.' };
  }
};

const apiTool = {
  function: getLocationsForHeadoffice,
  definition: {
    type: 'function',
    function: {
      name: 'get_locations_for_headoffice',
      description: 'Get all locations for a headoffice.',
      parameters: {
        type: 'object',
        properties: {
          headofficeId: {
            type: 'string',
            description: 'The ID of the headoffice.'
          }
        },
        required: ['headofficeId']
      }
    }
  }
};

export { apiTool };