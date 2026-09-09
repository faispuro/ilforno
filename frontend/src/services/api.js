import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const headers = { ...(config.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (config.data instanceof FormData) {
    delete headers['Content-Type'];
    delete headers['content-type'];
  } else {
    headers['Content-Type'] = 'application/json';
  }

  config.headers = headers;

  return config;
});

export default API;