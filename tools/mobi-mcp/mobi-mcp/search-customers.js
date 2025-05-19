/**
 * Function to search for customers at a specific headoffice.
 *
 * @param {Object} args - Arguments for the customer search.
 * @param {string} args.headoffice - The ID of the headoffice to search customers for.
 * @param {string} [args.name] - Search by first or last name (optional).
 * @param {boolean} [args.is_subscriber] - Filter by promotional email opt-in (optional).
 * @param {string} [args.created_at] - Search by creation period e.g., '2015-10-01,2015-10-02' (optional).
 * @param {string} [args.order_by] - Order ascending or descending (optional).
 * @param {number} [args.offset] - Offset for pagination (optional).
 * @param {number} [args.limit=20] - Max customers returned (Max: 10000, Default: 20, optional).
 * @param {boolean} [args.export] - Async CSV export (optional).
 * @param {boolean} [args.export_v2] - Async CSV export with different columns (optional).
 * @returns {Promise<Object>} - The result of the customer search.
 */
const executeFunction = async ({ headoffice, name, is_subscriber, created_at, order_by, offset, limit = 20, export: exportCsv, export_v2 }) => {
  const baseUrl = 'https://www.mobi2go.com/api/1';
  const cookie = process.env.MOBI_COOKIE;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/headoffice/${headoffice}/customers`);
    if (name) url.searchParams.append('name', name);
    if (is_subscriber !== undefined) url.searchParams.append('is_subscriber', is_subscriber);
    if (created_at) url.searchParams.append('created_at', created_at);
    if (order_by) url.searchParams.append('order_by', order_by);
    if (offset) url.searchParams.append('offset', offset);
    if (limit) url.searchParams.append('limit', limit);
    if (exportCsv) url.searchParams.append('export', exportCsv);
    if (export_v2) url.searchParams.append('export_v2', export_v2);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      'Cookie': `MOBI2GO_ADMIN=${cookie}`
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
    return { error: 'An error occurred while searching for customers.' };
  }
};

/**
 * Tool configuration for searching customers at a headoffice.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_customers',
      description: 'Search for customers at a specific headoffice.',
      parameters: {
        type: 'object',
        properties: {
          headoffice: {
            type: 'string',
            description: 'The ID of the headoffice to search customers for.'
          },
          name: {
            type: 'string',
            description: 'Search by first or last name (optional).'
          },
          is_subscriber: {
            type: 'boolean',
            description: 'Filter by promotional email opt-in (optional).'
          },
          created_at: {
            type: 'string',
            description: 'Search by creation period e.g., \'2015-10-01,2015-10-02\' (optional).'
          },
          order_by: {
            type: 'string',
            description: 'Order ascending or descending (optional).'
          },
          offset: {
            type: 'integer',
            description: 'Offset for pagination (optional).'
          },
          limit: {
            type: 'integer',
            description: 'Max customers returned (Max: 10000, Default: 20, optional).'
          },
          export: {
            type: 'boolean',
            description: 'Async CSV export (optional).'
          },
          export_v2: {
            type: 'boolean',
            description: 'Async CSV export with different columns (optional).'
          }
        },
        required: ['headoffice']
      }
    }
  }
};

export { apiTool };