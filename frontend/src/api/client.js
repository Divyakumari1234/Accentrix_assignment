import axios from 'axios';

const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  if (typeof window !== 'undefined') {
    const { protocol, hostname } = window.location;
    if (hostname === 'accentrix-assignment-2.onrender.com') {
      return 'https://accentrix-assignment-1.onrender.com/api';
    }
    if (hostname.endsWith('.onrender.com')) {
      return `${protocol}//${hostname.replace('-2.', '-1.')}/api`;
    }
  }

  return 'http://localhost:5000/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 20000
});

api.interceptors.request.use((config) => {
  let auth = null;
  try {
    auth = JSON.parse(localStorage.getItem('accentrix_auth') || 'null');
  } catch (_error) {
    localStorage.removeItem('accentrix_auth');
  }
  if (auth?.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

export default api;
