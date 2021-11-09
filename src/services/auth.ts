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
    const guestToken = response.data.result.JWToken;
    AuthTokenStorageService.guestStore(guestToken);
    return guestToken;
  },

  logout() {
    return new Promise<void>(resolve => {
      if (Client.defaults.headers.common) {
        const headersCommon = Client.defaults.headers.common;
        delete headersCommon.Authorization;
        Client.defaults.headers.common = headersCommon;
      }
      AuthTokenStorageService.clear();
      resolve();
    });
  },

  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
};

export default AuthService;
