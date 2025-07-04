import axios from 'axios';

export const apiClient = axios.create({
  baseURL:'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('authToken') && {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    }),
  },
});
