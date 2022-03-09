import axios from 'axios';

const apiTrain = axios.create({
  baseURL: process.env.BASE_API_URL,
});

export default apiTrain;
