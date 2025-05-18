/**
 * Function to list all group tabs report for a specific location.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.location - The Location ID or name.
 * @returns {Promise<Object>} - The result of the group tabs report.
 */
const executeFunction = async ({ headoffice, location }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/locations/${location}/group_tabs/report`;

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
    console.error('Error fetching group tabs report:', error);
    return { error: 'An error occurred while fetching the group tabs report.' };
  }
};

/**
 * Tool configuration for listing all group tabs report for a location.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_group_tabs_report',
      description: 'List all group tabs report for a specific location.',
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
          }
        },
        required: ['headoffice', 'location']
      }
    }
  }
};

export { apiTool };