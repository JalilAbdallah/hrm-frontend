import { apiFetch } from './apiconfig';
import { CASES_ENDPOINTS } from '../config/constants.js';

/**
 * Fetches cases with pagination and optional filters from the API.
 * @param {number} current_skip - The number of records to skip (for pagination).
 * @param {number} current_limit - The maximum number of records to return.
 * @param {Object} [options={}] - Optional filters for the request.
 * @param {string} [options.status] - Filter by case status (e.g., 'open', 'closed').
 * @param {string} [options.search] - Search term to filter cases by title or description.  
 * @param {string} [options.country] - Filter cases by country.
 * @param {string} [options.region] - Filter cases by region.
 * @param {string} [options.priority] - Filter cases by priority (e.g., 'high', 'medium', 'low').
 * @param {string} [options.date_from] - Filter cases created after this date (ISO format).
 * @param {string} [options.date_to] - Filter cases created before this date (ISO format).
 * @param {string} [options.violation_types] - Filter cases by violation types (comma-separated).
 * @param {string} [endpoint] - The API endpoint to use (defaults to GET_CASES for active cases).
 **/
export const fetchCasesWithPagination = async (current_skip = 1, current_limit = 15, options = {}, endpoint = CASES_ENDPOINTS.GET_CASES) => {
  try {
    let apiEndpoint = endpoint;
    const queryParams = new URLSearchParams();
    queryParams.append('current_skip', current_skip);
    queryParams.append('current_limit', current_limit);

    if (options.status) {
      queryParams.append('status', options.status);
    }
    if (options.search) {
      queryParams.append('search', options.search);
    }
    if (options.country) {
      queryParams.append('country', options.country);
    }
    if (options.region) {
      queryParams.append('region', options.region);
    }
    if (options.priority) {
      queryParams.append('priority', options.priority);
    }
    if (options.date_from) {
      queryParams.append('date_from', options.date_from);
    }
    if (options.date_to) {
      queryParams.append('date_to', options.date_to);
    }
    if (options.violation_types) {
      queryParams.append('violation_types', options.violation_types);
    }    const queryString = queryParams.toString();
    if (queryString) {
      apiEndpoint += `?${queryString}`;
    }
    
    console.log(`Fetching paginated cases from endpoint: ${apiEndpoint}`);
    const response = await apiFetch(apiEndpoint);

    // Check if the response is successful and has the expected structure
    if (response && Array.isArray(response.cases) && response.pagination) {
      return {
        data: response.cases,
        pagination: {
          total_count: response.pagination.total_count,
          current_skip: response.pagination.current_skip,
          current_limit: response.pagination.current_limit,
          returned_count: response.pagination.returned_count,
          has_next: response.pagination.has_next,
          has_prev: response.pagination.has_prev
        },
      };
    } else {
      // Log the unexpected structure for debugging
      console.warn('Paginated cases response structure was unexpected or request failed:', response);
      // Throw an error or return a default structure
      throw new Error(response?.message || 'Invalid data format received from server for paginated cases');
    }
  } catch (error) {
    // Ensure the error message is propagated
    throw new Error(error.message || 'Failed to fetch paginated cases');
  }
};

/**
 * Fetches a case by its ID from the API.
 * @param {string} caseId - The ID of the case to fetch.
 * @returns {Promise<Object>} - The case object.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const fetchCaseById = async (caseId) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.GET_CASE_BY_ID(caseId));
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Creates a new case in the API.
 * @param {Object} caseData - The data for the new case.
 * @returns {Promise<Object>} - The created case object.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const createCase = async (caseData) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.CREATE_CASE, {
      method: 'POST',
      body: JSON.stringify(caseData),
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to create case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Updates an existing case in the API.
 * @param {string} caseId - The ID of the case to update.
 * @param {Object} caseData - The updated data for the case.
 * @returns {Promise<Object>} - The updated case object.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const updateCase = async (caseId, caseData) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.UPDATE_CASE(caseId), {
      method: 'PUT',
      body: JSON.stringify(caseData),
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to update case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Restores an archived case in the API.
 * @param {string} caseId - The ID of the case to restore.
 * @returns {Promise<Object>} - The restored case object.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const restoreCase = async (caseId) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.RESTORE_CASE(caseId), {
      method: 'POST',
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to restore case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Deletes a case from the API.
 * @param {string} caseId - The ID of the case to delete.
 * @returns {Promise<void>} - Resolves when the case is deleted.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const deleteCase = async (caseId) => {
  try {
    await apiFetch(CASES_ENDPOINTS.DELETE_CASE(caseId), {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error(`Failed to delete case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Fetches archived cases with pagination and optional filters from the API.
 * @param {number} current_skip - The number of records to skip (for pagination).
 * @param {number} current_limit - The maximum number of records to return.
 * @param {Object} [options={}] - Optional filters for the request.
 * @returns {Promise<Object>} - Paginated list of archived cases.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const fetchArchivedCases = async (current_skip = 0, current_limit = 15, options = {}) => {
  try {
    return await fetchCasesWithPagination(current_skip, current_limit, options, CASES_ENDPOINTS.GET_ARCHIVED_CASES);
  } catch (error) {
    throw new Error(`Failed to fetch archived cases: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Fetches an archived case by its ID from the API.
 * @param {string} caseId - The ID of the archived case to fetch.
 * @returns {Promise<Object>} - The archived case object.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const fetchArchivedCaseById = async (caseId) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.GET_ARCHIVED_CASE_BY_ID(caseId));
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch archived case: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
/**
 * Fetches the history of a case by its ID from the API.
 * @param {string} caseId - The ID of the case to fetch history for.
 * @returns {Promise<Array>} - List of case history entries.
 * @throws {Error} - Custom error with detailed message and status code.
 */
export const fetchCaseHistory = async (caseId) => {
  try {
    const response = await apiFetch(CASES_ENDPOINTS.GET_CASE_HISTORY(caseId));
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch case history: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};

