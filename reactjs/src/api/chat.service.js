import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/chats/';

const getChats = () => {
  return axios.get(API_URL, { headers: authHeader() });
};

const getChatMessages = (chatId) => {
  return axios.get(API_URL + `${chatId}/messages`, { headers: authHeader() });
};

const toggleMute = (chatId, is_muted) => {
  return axios.post(API_URL + 'mute', { chatId, is_muted }, { headers: authHeader() });
};

const chatService = {
  getChats,
  getChatMessages,
  toggleMute
};

export default chatService;
