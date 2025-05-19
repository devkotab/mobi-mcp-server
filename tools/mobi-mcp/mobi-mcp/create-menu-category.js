/**
 * Function to create a new menu category.
 *
 * @param {Object} params - Parameters for the request.
 * @param {string} params.headoffice - HeadOffice ID.
 * @param {Object} params.body - Category payload.
 * @returns {Promise<Object>} - The response from the API.
 */
const executeFunction = async ({ headoffice, body }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;

  try {
    const url = `${baseUrl}/headoffice/${headoffice}/menu/categories`;
    const headers = {
      'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(await response.text());
    return await response.json();
  } catch (error) {
    console.error('Error creating menu category:', error);
    return { error: 'An error occurred while creating a menu category.' };
  }
};

const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'create_menu_category',
      description: 'Create a new menu category for a specific HeadOffice.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: { type: 'string' },
          body: { type: 'object' }
        },
        required: ['headoffice', 'body']
      }
    }
  }
};

export { apiTool };
