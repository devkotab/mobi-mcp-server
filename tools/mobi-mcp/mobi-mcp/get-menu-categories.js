/**
 * Function to get all menu categories for a HeadOffice.
 *
 * @param {Object} params
 * @param {string} params.headoffice
 * @returns {Promise<Object>}
 */
const executeFunction = async ({ headoffice }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    const url = `${baseUrl}/headoffice/${headoffice}/menu/categories`;
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    const response = await fetch(url, {
      method: 'GET',
      headers
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    return { error: 'An error occurred while fetching menu categories.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_menu_categories',
      description: 'Get all menu categories for a specific HeadOffice.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: { type: 'string' }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };
