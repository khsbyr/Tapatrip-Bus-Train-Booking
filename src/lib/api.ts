import apiClient from './apiClient';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import { Token } from 'graphql';
import { resolve } from 'path/posix';
import { reject } from 'lodash';
const baseUrl = 'http://47.243.62.69:8000/api';
const guestToken = async () => {
  const response = await apiClient.post('/account/guest_jwt/');

  const guestToken = response.data.result.JWToken;
  AuthTokenStorageService.guestStore(guestToken);
  return guestToken;
};
const postRequestNoToken = (url, data) => {
  return apiClient
    .post(url, data)
    .then(response => {
      if (response.status === 400 || response.status === 500)
        throw response.data;
      return response.data;
    })
    .catch(err => {
      err[1];
    });
};
const postRequest = async (url, data) => {
  const response = await postRequestNoToken('/account/guest_jwt/', {});
  const guestToken = response.result.JWToken;

  const resData = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${guestToken}`,
    },
    body: JSON.stringify(data),
  });
  const res = resData.json();
  return res;
};

export { postRequest, guestToken, postRequestNoToken };
