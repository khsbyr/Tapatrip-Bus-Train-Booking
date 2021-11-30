import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import AuthService from '@services/auth';
import isEmpty from '@utils/isEmpty';

const AuthStateContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('tapatrip_token');
      if (token) {
        try {
          const { data } = await new AuthApi(token).getCurrentUser();
          if (data && data?.status_code === 200) {
            if (!isEmpty(data?.result?.user)) {
              setUser(data?.result?.user);
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log('token finish');
        }
      } else {
        // guestToken({})
        //   .then(async res => {
        //     if (res && res?.status_code === 200) {
        //       Cookies.set('tapatrip_token', res?.result?.JWToken);
        //     }
        //   })
        //   .catch(error => {
        //     console.log('aldaa');
        //   });
      }

      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const setLogin = async token => {
    try {
      const { data: result } = await new AuthApi(token).getCurrentUser();
      if (result && result?.status_code === 200) {
        console.log('orson');
        setUser(result?.result?.user);
      } else {
        return null;
      }
    } catch (err) {
      // noop
      console.log('Login hiihed aldaa garlaa');
    }
  };

  const setLogout = () => {
    console.log('logout');
    Cookies.remove('tapatrip_token');
    setUser(null);
  };
  return (
    <AuthStateContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        loading,
        setLogin,
        setLogout,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
