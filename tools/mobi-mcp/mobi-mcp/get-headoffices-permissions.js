/**
 * Function to get headoffices permissions for the account.
 *
 * @returns {Promise<Object>} - The response containing headoffices permissions.
 */
const executeFunction = async () => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  
  if (!cookie) {
    throw new Error('MOBI_COOKIE environment variable is not set. Please provide a valid MOBI2GO_ADMIN cookie.');
  }
  
  try {
    const url = `${baseUrl}/account/headoffices`;

    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error) {
          errorMessage += ` - ${errorData.error}`;
        } else if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        } else {
          errorMessage += ` - ${JSON.stringify(errorData)}`;
        }
      } catch (parseError) {
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    throw new Error(`Failed to get headoffices permissions: ${errorMessage}`);
  }
};

/**
 * Tool configuration for getting headoffices permissions.
 * @type {Object}
 */
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