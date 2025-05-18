/**
 * Function to get the HTML sales report from the Mobi2Go API.
 *
 * @param {Object} args - Arguments for the report request.
 * @param {string} args.headoffice - The HeadOffice ID or name.
 * @param {string} args.report_type - The type of report to retrieve (weekly or monthly).
 * @returns {Promise<Object>} - The result of the sales report request.
 */
const executeFunction = async ({ headoffice, report_type }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const token = process.env.MOBI_MCP_API_KEY;
  try {
    // Construct the URL with path variables
    const url = `${baseUrl}/headoffice/${headoffice}/report/${report_type}`;

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/json'
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
    console.error('Error fetching sales report:', error);
    return { error: 'An error occurred while fetching the sales report.' };
  }
};

/**
 * Tool configuration for getting the HTML sales report from Mobi2Go.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_html_sales_report',
      description: 'Get the HTML sales report from Mobi2Go.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The HeadOffice ID or name.'
          },
          report_type: {
            type: 'string',
            enum: ['weekly', 'monthly'],
            description: 'The type of report to retrieve.'
          }
        },
        required: ['headoffice', 'report_type']
      }
    }
  }
};

export { apiTool };