/**
 * Function to read a specific modifier group by ID.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.id - The ID of the ModifierGroup.
 * @returns {Promise<Object>} - The response data containing the modifier group details.
 */
const executeFunction = async ({ headoffice, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/menu/modifier_groups/${id}`;

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error reading modifier group:', error);
    return { error: 'An error occurred while reading the modifier group.' };
  }
};

/**
 * Tool configuration for reading a specific modifier group.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'read_modifier_group',
      description: 'Read a specific modifier group by ID.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          id: {
            type: 'string',
            description: 'The ID of the ModifierGroup.'
          }
        },
        required: ['headoffice', 'id']
      }
    }
  }
};

export { apiTool };