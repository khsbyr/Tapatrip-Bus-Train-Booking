import { isEmpty } from 'lodash';
import Client from '@lib/apiClient';
import AuthTokenStorageService from '@services/AuthTokenStorageService';

const AuthService = {
  async authenticate(payload) {
    const response = await Client.post('/account/login/', payload);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getConfirmationCode(payload) {
    const response = await Client.post('/account/verify_code/phone/', payload);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async createNewPassword(payload) {
    const response = await Client.post('/account/forgot_password/', payload);
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async getCurrentUser(token = '') {
    const response = await Client.get('/account/profile/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const datas = {
      status: response.data.status_code,
      result: response.data.result,
      message: response.data.message,
    };
    return datas;
  },

  async createUserCheck(payload) {
    const data = {
      phone: payload.phone,
      dial_code: payload.dialCode,
    };

    const response = await Client.post(
      '/account/verification_code/phone/',
      data
    );
    return response?.data?.result;
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
    const response = await Client.post('/gandan/air/subscription/', {
      email: email,
    });
    return response;
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
  },

  isAuthenticated() {
    return !isEmpty(AuthTokenStorageService.getAccessToken());
  },
};

export default AuthService;
