/**
 * Function to read locations for a specified headoffice.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The ID or name of the headoffice.
 * @param {string} [args.fields] - Comma-separated fields to return (e.g., opening_hours,address).
 * @returns {Promise<Object>} - The result of the locations read operation.
 */
const executeFunction = async ({ headoffice, fields }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const url = `${baseUrl}/headoffice/${headoffice}/locations`;
  
  // Construct query parameters if fields are provided
  const queryParams = new URLSearchParams();
  if (fields) {
    queryParams.append('fields', fields);
  }

  try {
    // Perform the fetch request
    const response = await fetch(`${url}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
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
    console.error('Error reading locations for headoffice:', error);
    return { error: 'An error occurred while reading locations for the headoffice.' };
  }
};

/**
 * Tool configuration for reading locations for a headoffice.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_locations_for_headoffice',
      description: 'Read locations for a specified headoffice.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID or name of the headoffice.'
          },
          fields: {
            type: 'string',
            description: 'Comma-separated fields to return (e.g., opening_hours,address).'
          }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };