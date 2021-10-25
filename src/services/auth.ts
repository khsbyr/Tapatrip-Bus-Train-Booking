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

    const response = await Client.post(
      `${process.env.NEXT_APP_API_URL}/account/login`,
      data
    );
    const accessToken = response.data;

    AuthTokenStorageService.store(accessToken);

    return response;
  },

  async guestToken() {
    const response = await Client.post(
      `${process.env.NEXT_APP_API_URL}/account/guest_jwt/`
    );
    const guestToken = response.data;

    AuthTokenStorageService.guestStore(guestToken);

    return response;
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
