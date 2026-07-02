import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

// Register token request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("caffe_brew_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Callbacks to hook from the AuthProvider to reset states
let onUnauthorizedCallback: (() => void) | null = null;

export const registerOnUnauthorized = (callback: () => void) => {
  onUnauthorizedCallback = callback;
};

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    
    if (status === 401) {
      localStorage.removeItem("caffe_brew_token");
      if (onUnauthorizedCallback) {
        onUnauthorizedCallback();
      }
    }
    
    return Promise.reject(error);
  }
);
