/**
 * Function to get details of a specific card hold for a group tab (location).
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.location - The Location ID or name.
 * @param {string} args.group_tab - The ID of the group tab.
 * @param {string} args.card_hold - The ID of the card hold.
 * @returns {Promise<Object>} - The details of the specific card hold.
 */
const executeFunction = async ({ headoffice, location, group_tab, card_hold }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/group_tabs/${group_tab}/card_holds/${card_hold}`;

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
    console.error('Error getting card hold details:', error);
    return { error: 'An error occurred while getting card hold details.' };
  }
};

/**
 * Tool configuration for getting specific card hold details.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_card_hold_details',
      description: 'Get details of a specific card hold for a group tab (location).',
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
          },
          card_hold: {
            type: 'string',
            description: 'The ID of the card hold.'
          }
        },
        required: ['headoffice', 'location', 'group_tab', 'card_hold']
      }
    }
  }
};

export { apiTool };