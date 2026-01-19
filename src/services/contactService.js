import axios from 'axios';

// Replace with your Render backend URL
const API_URL = 'https://contact-backend-14vj.onrender.com/api/contacts';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000
});

const contactService = {
  getAll: async () => {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (err) {
      console.error("Failed to fetch contacts:", err);
      return [];
    }
  },
  getById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch contact:", err);
      return null;
    }
  },
  create: async (contact) => {
    const response = await api.post('/', contact);
    return response.data;
  },
  update: async (id, contact) => {
    const response = await api.put(`/${id}`, contact);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/${id}`);
    return response.data;
  }
};

export default contactService;
