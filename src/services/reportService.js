import {apiClient} from './configService';


export const listReports = async ({
  status = '',
  country = '',
  city = '',
  date_from = '',
  date_to = '',
} = {}) => {
  const params = {
    status,
    country,
    city,
    date_from,
    date_to,
  };

  Object.keys(params).forEach(
    key => (params[key] === '' || params[key] === undefined) && delete params[key],
  );

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
