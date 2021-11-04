import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://47.243.62.69:8001/api',
  headers: {
    'Content-type': 'application/json',
  },
});

export default apiClient;
