/**
 * Function to delete a menu category.
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
      method: 'DELETE',
      headers
    });

    if (!response.ok) throw new Error(await response.text());
    return { success: true };
  } catch (error) {
    console.error('Error deleting menu category:', error);
    return { error: 'An error occurred while deleting the menu category.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'delete_menu_category',
      description: 'Delete a menu category by ID.',
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
