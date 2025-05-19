/**
 * Function to get a single menu category.
 *
 * @param {Object} params
 * @param {string} params.headoffice
 * @param {number} params.id
 * @returns {Promise<Object>}
 */
const executeFunction = async ({ headoffice, id }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    const url = `${baseUrl}/headoffice/${headoffice}/menu/categories/${id}`;
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
    console.error('Error getting menu category:', error);
    return { error: 'An error occurred while fetching the menu category.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_menu_category',
      description: 'Get a specific menu category by ID.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: { type: 'string' },
          id: { type: 'number' }
        },
        required: ['headoffice', 'id']
      }
    }
  }
};

export { apiTool };
