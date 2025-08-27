import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

const createOrder = (serviceId) => {
  return axios.post(API_URL + 'orders/create', { serviceId }, { headers: authHeader() });
};

const uploadProof = (orderId, transactionCode, transactionProofUrl) => {
  return axios.post(API_URL + `orders/${orderId}/upload-proof`,
    {
      transaction_code: transactionCode,
      transaction_proof_url: transactionProofUrl
    },
    { headers: authHeader() }
  );
};

const getUserOrders = () => {
  return axios.get(API_URL + 'orders', { headers: authHeader() });
};

const getSecret = (orderId) => {
  return axios.get(API_URL + `orders/${orderId}/secret`, { headers: authHeader() });
};

const orderService = {
  createOrder,
  uploadProof,
  getUserOrders,
  getSecret
};

export default orderService;
