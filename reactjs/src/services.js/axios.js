// src/utils/api.js
import axios from "axios";

const baseURL = process.env.REACT_APP_NODE_ENV === 'development' ? 'http://localhost:8080/api' : 'https://www.subsnepal.com/api/'

export const newAxios = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// GET request
export const getRequest = async (url, params = {}) => {
  try {
    const response = await newAxios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// POST request
export const postRequest = async (url, data = {}) => {
  try {
    const response = await newAxios.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

