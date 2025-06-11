// src/services/reportsService.js

import axios from 'axios';

const apiClient = axios.create({
  baseURL:'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('authToken') && {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }),
  },
});

export const listReports = async ({
  status = '',
  country = '',
  city = '',
  date_from = '',
  date_to = '',
} = {}) => {
  // Build the params object
  const params = {
    status,
    country,
    city,
    date_from,
    date_to,
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
  console.log('Creating report with data:', reportData);
  const response = await apiClient.post('/reports', reportData);
  return response.data;
};

export const updateReportStatus = async (reportId, status) => {
  const response = await apiClient.patch(`/reports/${reportId}`, { status });
  return response.data;
};
