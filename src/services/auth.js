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

  async verifySms(payload) {
    const data = {
      phone: payload.phone,
      dial_code: payload.dialCode,
    };

    const response = await Client.post(
      '/account/global_verification_code/phone/',
      data
    );
    const result = response.data.status_code === 200 ? true : false;
    return result;
  },

  async emailSubscribe(email) {
    const response = await Client.post(
      '/account/global_verification_code/phone/',
      email
    );
    const result = response.data.status_code === 200 ? true : false;
    return result;
  },

  async verifyCode(payload) {
    const data = {
      phone: payload.phone,
      dial_code: payload.dialCode,
      code: payload.code,
    };

    const response = await Client.post('/account/register/customer/', data);
    const result = response.data.status_code === 200 ? true : false;
    const customerToken = result && response.data.result.token;
    AuthTokenStorageService.store(customerToken);
    return result;
  },

  async guestToken() {
    const response = await Client.post('/account/guest_jwt/');
    const guestToken = response.data.result.JWToken;
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
