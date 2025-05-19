/**
 * Function to update a specific modifier group in the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the update.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.id - The ID of the ModifierGroup.
 * @param {Object} args.attributes - The attributes to update for the ModifierGroup.
 * @returns {Promise<Object>} - The result of the update operation.
 */
const executeFunction = async ({ headoffice, id, attributes }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/menu/modifier_groups/${id}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Prepare the body of the request
    const body = JSON.stringify({ attributes });

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body,
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
    console.error('Error updating modifier group:', error);
    return { error: 'An error occurred while updating the modifier group.' };
  }
};

/**
 * Tool configuration for updating a specific modifier group in the Mobi2Go API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_modifier_group',
      description: 'Update a specific modifier group in the Mobi2Go API.',
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
          },
          attributes: {
            type: 'object',
            description: 'The attributes to update for the ModifierGroup.'
          }
        },
        required: ['headoffice', 'id', 'attributes']
      }
    }
  }
};

export { apiTool };