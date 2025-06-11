import {  apiFetch} from './apiconfig';
import { ANALYTICS_ENDPOINTS } from '../config/constants';



/**
 * Fetches dashboard data from the analytics API.
 * @returns {Promise<Object>} - The dashboard data.
 * // total_cases=total_cases,
// total_reports=total_reports,
// total_victims=total_victims,
// cases_by_status=cases_by_status,
// reports_by_status=reports_by_status,
// victims_by_risk=victims_by_risk,
// recent_activity=recent_activity,
 * @throws {Error} - If the API request fails or returns an error.
 */
export const fetchDashboardData = async () => {
  try {
    const response = await apiFetch(ANALYTICS_ENDPOINTS.GET_ANALYTICS);
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch dashboard data: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};

export const fetchTrendData = async (data) => {
  try {
    const response = await apiFetch(ANALYTICS_ENDPOINTS.GET_TRENDS, {
      method: 'GET',
      body: JSON.stringify({ data }),
    });
    return response;
  } catch (error) {
    throw new Error(`Failed to fetch trend data: ${error.message}`, {
      cause: { status: error.status, details: error.details },
    });
  }
};
