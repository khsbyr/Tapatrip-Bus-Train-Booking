import Client from '@lib/apiClient';
import AuthTokenStorageService from '@services/AuthTokenStorageService';
import AuthService from '@services/auth';
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const getRequestNoToken = async url => {
  return await Client.get(url)
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
  const token =
    AuthTokenStorageService.getGuestToken() || (await AuthService.guestToken());
  const resData = await fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  const res = resData.json();
  return res;
};
export { postRequest, getRequestNoToken };
