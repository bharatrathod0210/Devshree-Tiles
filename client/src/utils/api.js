import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token from localStorage if present
api.interceptors.request.use((config) => {
  const adminData = localStorage.getItem('devshree-admin');
  if (adminData) {
    const { token } = JSON.parse(adminData);
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
