import axios from 'axios';
import {getAuth} from './utils';

const API_URL = process.env.REACT_APP_API_URL || `http://localhost:2000/auth/v1`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to set token before each request.
api.interceptors.request.use((config) => {
  const {authtoken} = getAuth();
  config.headers.authtoken = authtoken || null;
  config.headers['auth-service'] = Date.now();
  return config;
});

export default api;
