import {apiClient} from './configService';

export const getGeodata = async ({
  violation_type = '',
  country = '',
} = {}) => {
  const params = {
    violation_type,
    country,
  };

  Object.keys(params).forEach(
    key => (params[key] === '' || params[key] === undefined) && delete params[key],
  );

  const { data } = await apiClient.get('/analytics/geodata', { params });
  return data;
};