import React, { useState, useContext } from 'react';

export const GlobalContext = React.createContext({});

export const useGlobalStore = () => useContext(GlobalContext);

export default function ContextProvider({ children }) {
  const [startLocation, setStartLocation] = useState();
  const [stopLocation, setStopLocation] = useState();

  return (
    <GlobalContext.Provider
      value={{
        startLocation,
        setStartLocation,
        stopLocation,
        setStopLocation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
