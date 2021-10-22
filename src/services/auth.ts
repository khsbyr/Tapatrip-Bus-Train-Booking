import { isEmpty } from 'lodash';
import Client from '@lib/apiClient';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const AuthService = {
  async authenticate(payload) {
    const data = {
      grantType: 'password',
      username: payload.username,
      password: payload.password,
      rememberMe: payload.rememberMe,
      clientId: process.env.VUE_APP_CLIENT_ID,
      clientSecret: process.env.VUE_APP_CLIENT_SECRET,
    };

    const response = await Client.post(
      `${process.env.VUE_APP_API_BASE_URL}/oauth/token`,
      data
    );
    const accessToken = response.data;

    AuthTokenStorageService.store(accessToken);

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
