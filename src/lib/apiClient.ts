import axios from 'axios';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const token =
  AuthTokenStorageService.getAccessToken() === undefined ||
  AuthTokenStorageService.getAccessToken() === 'false'
    ? AuthTokenStorageService.getGuestToken()
    : AuthTokenStorageService.getAccessToken();

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
  },
});

export default apiClient;
