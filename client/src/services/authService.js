import api from "./api";

const authService = {
    register: async (formData) => {
        const response = await api.post("/auth/register", formData);
        return response.data.data;
    },

    login: async (credentials) => {
        const response = await api.post("/auth/login", credentials);
        return response.data.data;
    },

    refresh: async () => {
        const response = await api.post("/auth/refresh");
        return response.data.data;
    },

    logout: async () => {
        const response = await api.post("/auth/logout");
        return response.data;
    },

    getMe: async () => {
  const response = await api.get("/auth/me");
  return response.data.data;
},
}

export default authService;