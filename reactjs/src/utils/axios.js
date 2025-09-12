// src/services/api.js
import axios from 'axios';

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.yourdomain.com' // Production
    : 'http://localhost:8080/api/';     // Development

// Create axios instance with cookies
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // 👈 important for cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

// GET request
export const getRequest = (endpoint, params = {}) => {
  return api.get(endpoint, { params }).then((res) => res.data);
};

// POST request
export const postRequest = (endpoint, data = {}) => {
  return api.post(endpoint, data).then((res) => res.data);
};

export default api;
