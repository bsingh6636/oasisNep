// src/utils/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api", // change to your backend base URL
  withCredentials: true,                // allows sending cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request
export const getRequest = async (url, params = {}) => {
  try {
    const response = await API.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// POST request
export const postRequest = async (url, data = {}) => {
  try {
    const response = await API.post(url, data);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};
