// src/services/reportsService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL:'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const listReports = async ({
  status = '',
  country = '',
  city = '',
  date_from = '',
  date_to = '',
  skip = 0,
  limit = 100,
} = {}) => {
  // Build the params object
  const params = {
    status,
    country,
    city,
    date_from,
    date_to,
    skip,
    limit,
  };

  // OPTIONAL: remove empty strings so the query-string is clean
  Object.keys(params).forEach(
    key => (params[key] === '' || params[key] === undefined) && delete params[key],
  );

  // Pass params as the second argument to axios
  const { data } = await apiClient.get('/reports', { params });
  return data;
};

export const createReport = async (reportData) => {
  const response = await apiClient.post('/reports', reportData);
  return response.data;
};

export const updateReportStatus = async (reportId, status) => {
  const response = await apiClient.patch(`/reports/${reportId}`, { status });
  return response.data;
};
