/**
 * Function to get headoffices permissions for the account.
 *
 * @returns {Promise<Object>} - The response containing headoffices permissions.
 */
const executeFunction = async () => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  console.error(`[DEBUG] executeFunction: Starting.`);
  console.error(`[DEBUG] executeFunction: MOBI_COOKIE value being used: ${cookie ? cookie.slice(0, 15) + '...' : 'NOT SET OR UNDEFINED'}`); // Log part of the cookie

  try {
    const url = `${baseUrl}/account/headoffices`;
    console.error(`[DEBUG] executeFunction: Request URL: ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };
    console.error(`[DEBUG] executeFunction: Request Headers: ${JSON.stringify(headers)}`);

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    console.error(`[DEBUG] executeFunction: Response Status: ${response.status}`);
    console.error(`[DEBUG] executeFunction: Response Status Text: ${response.statusText}`);
    // Log response headers
    const responseHeaders = {};
    response.headers.forEach((value, name) => {
      responseHeaders[name] = value;
    });
    console.error(`[DEBUG] executeFunction: Response Headers: ${JSON.stringify(responseHeaders)}`);

    if (!response.ok) {
      console.error(`[DEBUG] executeFunction: Response not OK (status: ${response.status}). Reading error body as text...`);
      const errorBodyText = await response.text(); // Read as text first, as it might not be JSON
      console.error(`[DEBUG] executeFunction: Error response body (text): ${errorBodyText}`);
      try {
        const errorData = JSON.parse(errorBodyText); // Then try to parse as JSON
        console.error(`[DEBUG] executeFunction: Error response body (parsed JSON): ${JSON.stringify(errorData)}`);
        throw new Error(errorData.message || JSON.stringify(errorData)); // Prefer errorData.message if available
      } catch (jsonParseError) {
        // If parsing the error body as JSON fails, throw the text content
        throw new Error(`HTTP error ${response.status}. Body: ${errorBodyText}`);
      }
    }

    console.error(`[DEBUG] executeFunction: Response OK. Reading response body as JSON...`);
    const data = await response.json();
    console.error(`[DEBUG] executeFunction: Successfully fetched and parsed data.`);
    return data;

  } catch (error) {
    console.error(`[DEBUG] executeFunction: Error caught in catch block.`);
    console.error(`[DEBUG] executeFunction: Error Name: ${error.name}`);
    console.error(`[DEBUG] executeFunction: Error Message: ${error.message}`);
    if (error.stack) {
      console.error(`[DEBUG] executeFunction: Error Stack: ${error.stack}`);
    }
    // Include the actual error message in the returned object for more insight
    return { error: 'An error occurred while getting headoffices permissions.', details: error.message, name: error.name };
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