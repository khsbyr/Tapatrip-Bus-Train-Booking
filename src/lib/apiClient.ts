import axios from 'axios';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const token =
  AuthTokenStorageService.getAccessToken() &&
  AuthTokenStorageService.getAccessToken() != 'false'
    ? AuthTokenStorageService.getAccessToken()
    : AuthTokenStorageService.getGuestToken();

const locale =
  AuthTokenStorageService.getLocale() &&
  AuthTokenStorageService.getLocale() != 'false'
    ? AuthTokenStorageService.getLocale()
    : 'mn';

const apiClient = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    'Content-type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
    'Accept-Language': locale,
  },
});
export default apiClient;
