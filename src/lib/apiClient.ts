import axios from 'axios';
import humps from 'humps';
import { isEmpty } from 'lodash';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const apiClient = axios.create({
  baseURL: process.env.NEXT_APP_API_URL,

  transformRequest: [data => humps.decamelizeKeys(data)],

  transformResponse: [data => humps.camelizeKeys(data)],
});

apiClient.interceptors.request.use(
  config => {
    const token = AuthTokenStorageService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

export default apiClient;
