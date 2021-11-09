import cookie from 'js-cookie';

const AuthTokenStorageService = {
  store(accessToken) {
    cookie.set('user-token', accessToken, { expires: 1 / 24 });
  },

  guestStore(guestToken) {
    cookie.set('guest-token', guestToken, { expires: 1 / 24 });
  },

  getAccessToken() {
    return cookie.get('user-token');
  },

  getGuestToken() {
    return cookie.get('guest-token');
  },

  clear() {
    cookie.remove('user-token');
    cookie.remove('guest-token');
  },
};

export default AuthTokenStorageService;
