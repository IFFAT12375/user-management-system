import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// In-memory access token. It disappears on page reload.
let accessToken = null;

export const setAccessToken = (token) => {
    accessToken = token;
};

api.interceptors.request.use((config) => {
    if(accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default api;