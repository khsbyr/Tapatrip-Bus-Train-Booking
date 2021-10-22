declare var window: any;

const AuthTokenStorageService = {
  store(accessToken) {
    window.$cookies.set(
      process.env.USER_TOKEN_KEY,
      accessToken,
      '',
      '',
      process.env.NEXT_APP_COOKIE_HOST_NAME
    );
  },

  guestStore(guestToken) {
    window.$cookies.set(
      process.env.GUEST_TOKEN_KEY,
      guestToken,
      '',
      '',
      process.env.NEXT_APP_COOKIE_HOST_NAME
    );
  },

  getAccessToken() {
    return window.$cookies.get(process.env.USER_TOKEN_KEY);
  },

  getGuestToken() {
    return window.$cookies.get(process.env.GUEST_TOKEN_KEY);
  },

  clear() {
    window.$cookies.remove(process.env.USER_TOKEN_KEY);
    window.$cookies.remove(process.env.GUEST_TOKEN_KEY);
  },
};

export default AuthTokenStorageService;
