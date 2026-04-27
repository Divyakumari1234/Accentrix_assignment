import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://accentrix-assignment-1.onrender.com/api'
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
