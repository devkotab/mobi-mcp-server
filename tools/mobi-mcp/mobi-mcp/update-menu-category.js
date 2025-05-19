/**
 * Function to update a menu category.
 *
 * @param {Object} params
 * @param {string} params.headoffice
 * @param {number} params.id
 * @param {Object} params.body - Updated category data
 * @returns {Promise<Object>}
 */
const executeFunction = async ({ headoffice, id, body }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    const url = `${baseUrl}/headoffice/${headoffice}/menu/categories/${id}`;
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error updating menu category:', error);
    return { error: 'An error occurred while updating the menu category.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'update_menu_category',
      description: 'Update a menu category by ID.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: { type: 'string' },
          id: { type: 'number' },
          body: { type: 'object' }
        },
        required: ['headoffice', 'id', 'body']
      }
    }
  }
};

export { apiTool };
