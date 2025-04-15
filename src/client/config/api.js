// API configuration file that uses environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Export a base URL that can be used across the application
export const baseApiUrl = API_URL.endsWith('/api') ? API_URL : `${API_URL}/api`;

// Helper function to create complete API URLs
export const createApiUrl = (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseApiUrl}${path}`;
};

export default {
  baseApiUrl,
  createApiUrl
};