/**
 * Function to get headoffice information.
 *
 * @param {Object} args - Arguments for the function.
 * @param {string} args.headofficeId - The ID of the headoffice.
 * @returns {Promise<Object>} - The headoffice data.
 */
const getHeadoffice = async ({ headofficeId }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL
    const url = `${baseUrl}/headoffice/${headofficeId}`;

    // Set up headers for the request including the cookie
    const headers = {
      'Accept': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers,
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
    return { error };
  }
};


// Tool configurations
const apiTool = {
  function: getHeadoffice,
  definition: {
    type: 'function',
    function: {
      name: 'get_headoffice',
      description: 'Get information about a headoffice.',
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

export {  apiTool };