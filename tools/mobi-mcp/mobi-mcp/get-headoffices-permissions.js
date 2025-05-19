/**
 * Function to get headoffices permissions for the account.
 *
 * @returns {Promise<Object>} - The response containing headoffices permissions.
 */
const executeFunction = async () => {
  console.log('=== Starting get_headoffices_permissions function ===');
  
  // Log environment details
  console.log(`Node version: ${process.version}`);
  console.log(`Working directory: ${process.cwd()}`);
  
  const baseUrl = 'https://www.mobi2go.com/api/1';
  console.log(`Base URL: ${baseUrl}`);
  
  // Check cookie with safe logging
  const cookie = process.env.MOBI_COOKIE;
  if (cookie) {
    console.log(`MOBI_COOKIE exists with length: ${cookie.length}`);
    console.log(`MOBI_COOKIE first 3 chars: ${cookie.substring(0, 3)}...`);
  } else {
    console.error('MOBI_COOKIE environment variable is NOT SET');
  }
  
  if (!cookie) {
    const error = new Error('MOBI_COOKIE environment variable is not set. Please provide a valid MOBI2GO_ADMIN cookie.');
    console.error(error.message);
    throw error;
  }
  
  try {
    const url = `${baseUrl}/account/headoffices`;
    console.log(`Making request to: ${url}`);

    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };
    console.log('Headers set (cookie value hidden):', JSON.stringify({
      'Content-Type': 'application/json',
      'Cookie': 'MOBI2GO_ADMIN=***REDACTED***'
    }));

    console.log('Executing fetch request...');
    const fetchStartTime = Date.now();
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    const fetchEndTime = Date.now();
    console.log(`Fetch completed in ${fetchEndTime - fetchStartTime}ms`);
    
    console.log(`Response status: ${response.status} ${response.statusText}`);
    console.log(`Response headers: ${JSON.stringify(Object.fromEntries([...response.headers]))}`);

    if (!response.ok) {
      console.error(`Response not OK: ${response.status} ${response.statusText}`);
      
      const errorText = await response.text();
      console.error(`Error response body: ${errorText}`);
      
      let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;
      
      try {
        console.log('Trying to parse error response as JSON...');
        const errorData = JSON.parse(errorText);
        console.log(`Parsed error data: ${JSON.stringify(errorData)}`);
        
        if (errorData.error) {
          errorMessage += ` - ${errorData.error}`;
        } else if (errorData.message) {
          errorMessage += ` - ${errorData.message}`;
        } else {
          errorMessage += ` - ${JSON.stringify(errorData)}`;
        }
      } catch (parseError) {
        console.error(`Failed to parse error response as JSON: ${parseError}`);
        if (errorText) {
          errorMessage += ` - ${errorText}`;
        }
      }
      
      const error = new Error(errorMessage);
      console.error(`Throwing error: ${error.message}`);
      throw error;
    }

    console.log('Response OK, parsing JSON...');
    const data = await response.json();
    console.log(`Received data with ${Object.keys(data).length} top-level keys`);
    
    // Safe logging of response data structure without exposing all content
    const keysLog = Object.keys(data).join(', ');
    console.log(`Response data keys: ${keysLog}`);
    
    if (Array.isArray(data)) {
      console.log(`Response is an array with ${data.length} items`);
      if (data.length > 0) {
        console.log(`First item has keys: ${Object.keys(data[0]).join(', ')}`);
      }
    }
    
    console.log('=== Successfully completed get_headoffices_permissions ===');
    return data;
  } catch (error) {
    console.error('=== ERROR in get_headoffices_permissions ===');
    console.error(`Error name: ${error.name}`);
    console.error(`Error message: ${error.message}`);
    console.error(`Error stack: ${error.stack}`);
    
    // Check if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.error('Likely a network connectivity issue');
    }
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    const finalError = new Error(`Failed to get headoffices permissions: ${errorMessage}`);
    
    // Return the error in a structured way that can be read in the MCP logs
    return {
      error: true,
      message: finalError.message,
      timestamp: new Date().toISOString(),
      details: error instanceof Error ? error.stack : undefined
    };
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

// Log when this module is loaded
console.log('Headoffices permissions tool module loaded');

export { apiTool };