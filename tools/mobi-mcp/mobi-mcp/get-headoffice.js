import fetch from 'node-fetch';

/**
 * Function to get headoffice information.
 *
 * @param {Object} args - Arguments for the function.
 * @param {string} args.headofficeId - The ID of the headoffice.
 * @returns {Promise<Object>} - The headoffice data or an error.
 */
const getHeadoffice = async ({ headofficeId }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  // Early validation
  if (!headofficeId) {
    return { error: 'headofficeId is required' };
  }
  if (!cookie) {
    return { error: 'MOBI_COOKIE is not set' };
  }

  try {
    const url = `${baseUrl}/headoffice/${headofficeId}`;
    const headers = {
      'Accept': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    const response = await fetch(url, { method: 'GET', headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed with status ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message, stack: error.stack };
  }
};

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

export { apiTool };
