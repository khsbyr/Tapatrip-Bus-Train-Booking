import cookie from 'js-cookie';

const AuthTokenStorageService = {
  store(accessToken: string) {
    cookie.set('user-token', accessToken, { expires: 1 / 24 });
  },

  guestStore(guestToken: string) {
    cookie.set('guest-token', guestToken);
  },

  getAccessToken() {
    return cookie.get('user-token');
  },

  getGuestToken() {
    return cookie.get('guest-token');
  },

  clear() {
    cookie.remove('user-token');
  },
};

export default AuthTokenStorageService;
