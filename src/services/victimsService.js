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

export const listWaitingVictims = async () => {
    const response = await apiClient.get('/victims/waited');
    return response.data;
};

export const updateVictimListByCase = async (caseId, updatedVictims) => {
    const response = await apiClient.patch(`/victims/waited/case/${caseId}`, {
        victims: updatedVictims,
    });
    return response.data;
};

export const createVictim = async (victimData) => {
    const response = await apiClient.post('/victims/', victimData);
    return response.data;
};

export const getVictimsByCase = async (caseId) => {
    const response = await apiClient.get(`/victims/case/${caseId}`);
    return response.data;
};

export const updateRiskAssessment = async (victimId, riskData) => {
    const response = await apiClient.patch(`/victims/${victimId}`, riskData);
    return response.data;
};

export const getVictimById = async (victimId) => {
    const response = await apiClient.get(`/victims/${victimId}`);
    return response.data;
};
