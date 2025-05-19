/**
 * Function to get headoffices permissions for the account.
 *
 * @returns {Promise<Object>} - The response containing headoffices permissions.
 */
const executeFunction = async () => {
  try {
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
      // Instead of throwing, return a detailed error message
      return {
        error: true,
        message: 'MOBI_COOKIE environment variable is not set. Please provide a valid MOBI2GO_ADMIN cookie.'
      };
    }
    
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

    // Try a simple ping test first to verify connectivity
    try {
      console.log('Testing connectivity to google.com...');
      const pingTest = await fetch('https://www.google.com', { 
        method: 'HEAD',
        timeout: 5000 
      });
      console.log(`Ping test result: ${pingTest.status} ${pingTest.statusText}`);
    } catch (pingError) {
      console.error(`Ping test failed: ${pingError.message}`);
      return {
        error: true,
        message: `Network connectivity issue detected: ${pingError.message}`
      };
    }

    console.log('Executing fetch request...');
    const fetchStartTime = Date.now();
    
    // Use AbortController to add timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 10000); // 10-second timeout
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers,
        signal: controller.signal
      });
      
      clearTimeout(timeout);
      
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
        
        return {
          error: true,
          message: errorMessage,
          statusCode: response.status
        };
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
    } catch (fetchError) {
      clearTimeout(timeout);
      console.error(`Fetch error: ${fetchError.message}`);
      
      if (fetchError.name === 'AbortError') {
        return {
          error: true,
          message: 'Request timed out after 10 seconds',
          details: fetchError.stack
        };
      }
      
      return {
        error: true,
        message: `Network error: ${fetchError.message}`,
        details: fetchError.stack
      };
    }
  } catch (outerError) {
    // This catches any other unexpected errors in the function
    console.error('=== CRITICAL ERROR in get_headoffices_permissions ===');
    console.error(`Error name: ${outerError.name}`);
    console.error(`Error message: ${outerError.message}`);
    console.error(`Error stack: ${outerError.stack}`);
    
    return {
      error: true,
      message: `Unexpected error: ${outerError.message}`,
      timestamp: new Date().toISOString(),
      details: outerError.stack
    };
  }
};

// Export both the function itself for direct testing and the tool configuration
const headofficesPermissionsTool = {
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

// Try to log when this module is loaded - this should show up in logs
try {
  console.log('======================================');
  console.log('Headoffices permissions tool module loaded at ' + new Date().toISOString());
  console.log('======================================');
} catch (e) {
  // If even this logging fails, we're in trouble
  console.error('Failed to log module loading:', e);
}

export { headofficesPermissionsTool as apiTool };

// Add a direct test function that can be called for debugging
export const testFunction = async () => {
  console.log('Running test function');
  const result = await executeFunction();
  console.log('Test function result:', JSON.stringify(result, null, 2));
  return result;
};