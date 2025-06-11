
export const AUTH_ENDPOINTS = {
  LOGIN: `/auth/login`,
  REGISTER: `/auth/register`,
};
export const CASES_ENDPOINTS = {
  GET_CASES: `/cases/`,
  GET_CASE_BY_ID: (case_id) => `/cases/${case_id}`,
  CREATE_CASE: `/cases/`,
  UPDATE_CASE: (case_id) => `/cases/${case_id}`,
  RESTORE_CASE: (case_id) => `/cases/archive/${case_id}/restore`,
  DELETE_CASE: (case_id) => `/cases/${case_id}`,
  GET_ARCHIVED_CASES: `/cases/archive/`,
  GET_ARCHIVED_CASE_BY_ID: (case_id) => `/cases/archive/${case_id}`,
  GET_CASE_HISTORY: (case_id) => `/cases/history/${case_id}`,
  CREATE_VICTIMS_WAITLIST: '/cases/waitlist/'
};

export const ANALYTICS_ENDPOINTS = {
  GET_ANALYTICS: `/analytics/dashboard/`,
  GET_TRENDS: (date_from, date_to) => `/analytics/trends/?year_from=${date_from}&year_to=${date_to}`,
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  AUTH_USER: 'authUser', // Added from AuthContext.jsx
};

export const ROLES = {
  ADMIN: 'admin',
  INSTITUTION: 'institution',
};
