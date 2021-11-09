import { isEmpty } from 'lodash';
import Client from '@lib/apiClient';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const AuthService = {
  async authenticate(payload) {
    const data = {
      email: payload.email,
      dialCode: payload.dialCode,
      phone: payload.phone,
      password: payload.password,
      remember: payload.remember,
    };

    const response = await Client.post('/account/login', data);
    const accessToken = response.data;

    AuthTokenStorageService.store(accessToken);

    return response;
  },
  
  async guestToken() {
    const response = await Client.post('/account/guest_jwt/');
    let guestToken = response.data.result.JWToken;
    AuthTokenStorageService.guestStore(guestToken);
    return guestToken;
  },

  logout() {
    AuthTokenStorageService.clear();
    resolve();
  },

  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
};

export default AuthService;
