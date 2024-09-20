import api from '../api';

export const fetchParticipants = async eventId => {
  try {
    const response = await api.get(`/participants/${eventId}`);
    return response.data || null;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return [];
    }
    throw error;
  }
};

export const registerParticipant = async participantData => {
  try {
    const response = await api.post('/participants/register', participantData);
    return response.data;
  } catch (error) {
    console.error('Error registering participant:', error);
    throw error;
  }
};
