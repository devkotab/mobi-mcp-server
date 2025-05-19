import fetch from 'node-fetch';

/**
 * Function to get headoffices permissions for the account.
 *
 * @returns {Promise<Object>} - The response containing headoffices permissions or an error.
 */
const executeFunction = async () => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  if (!cookie) {
    return { error: 'MOBI_COOKIE is not set' };
  }

  try {
    const url = `${baseUrl}/account/headoffices`;
    const headers = {
      'Content-Type': 'application/json',
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
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_headoffices_permissions',
      description: 'Get headoffices that the account has permissions for.',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  }
};

export { apiTool };
