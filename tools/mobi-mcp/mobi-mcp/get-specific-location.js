/**
 * Function to get information about a specific location.
 *
 * @param {Object} args - Arguments for the function.
 * @param {string} args.headofficeId - The ID of the headoffice.
 * @param {string} args.locationId - The ID of the location.
 * @returns {Promise<Object>} - The location data.
 */
const getLocation = async ({ headofficeId, locationId }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL
    const url = `${baseUrl}/headoffice/${headofficeId}/locations/${locationId}`;

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
    return { error: 'An error occurred while getting location information.' };
  }
};

const apiTool = {
  function: getLocation,
  definition: {
    type: 'function',
    function: {
      name: 'get_location',
      description: 'Get information about a specific location.',
      parameters: {
        type: 'object',
        properties: {
          headofficeId: {
            type: 'string',
            description: 'The ID of the headoffice.'
          },
          locationId: {
            type: 'string',
            description: 'The ID of the location.'
          }
        },
        required: ['headofficeId', 'locationId']
      }
    }
  }
};

export { apiTool };