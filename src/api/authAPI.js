// src/api/authApi.js
import { apiFetch } from './apiconfig';
import { AUTH_ENDPOINTS,STORAGE_KEYS } from '../config/constants.js';
/**
 * Logs in a user with the provided credentials.
 * @param {Object} credentials - { email: string, password: string }
 * @returns {Promise<Object>} - { success: boolean, user: Object, token: string, error: string }
 */
export const login = async (credentials) => {
  try {
    const response = await apiFetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.user_data && response.token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, response.token);
      localStorage.setItem(STORAGE_KEYS.AUTH_USER, JSON.stringify(response.user_data));
      return {
        success: true,
        user: response.user_data,
        token: response.token,
      };
    } else {
      throw new Error(response.error || 'Login successful but no user data or token received');
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Login failed',
    };
  }
};