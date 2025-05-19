/**
 * Function to get the HTML receipt for a group tab at a specific location.
 *
 * @param {Object} args - Arguments for the receipt retrieval.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.location - The Location ID or name.
 * @param {string} args.group_tab - The ID of the group tab.
 * @returns {Promise<Object>} - The HTML receipt response.
 */
const executeFunction = async ({ headoffice, location, group_tab }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/group_tabs/${group_tab}/receipt`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'text/html',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    // Perform the fetch request
    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    // Parse and return the response data
    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error getting receipt:', error);
    return { error: 'An error occurred while getting the receipt.' };
  }
};

/**
 * Tool configuration for getting the HTML receipt for a group tab.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_receipt_for_group_tab',
      description: 'Get HTML receipt for a group tab at a specific location.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          location: {
            type: 'string',
            description: 'The Location ID or name.'
          },
          group_tab: {
            type: 'string',
            description: 'The ID of the group tab.'
          }
        },
        required: ['headoffice', 'location', 'group_tab']
      }
    }
  }
};

export { apiTool };