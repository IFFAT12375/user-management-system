
import api from "./api";

const userService = {
  getAll: async () => {
    const response = await api.get("/users");
    return response.data.data;
  },

  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data.data;
  },

  create: async (userData) => {
    const response = await api.post("/users", userData);
    return response.data.data;
  },

  update: async (id, userData) => {
    const response = await api.patch(`/users/${id}`, userData);
    return response.data.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

export default userService;