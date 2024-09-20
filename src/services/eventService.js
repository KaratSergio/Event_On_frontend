import api from '../api';

export const fetchEvents = async (page = 1, limit = 8) => {
  try {
    const response = await api.get(`/events?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
