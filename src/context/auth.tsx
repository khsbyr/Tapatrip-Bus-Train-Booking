import React, { createContext, useState, useContext } from 'react';

const AuthStateContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthStateContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        setUser,
      }}
    >
      {children}
    </AuthStateContext.Provider>
  );
};

export const useAuthState = () => useContext(AuthStateContext);
