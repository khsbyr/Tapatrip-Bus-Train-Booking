import React from 'react';

export interface State {
  displayMenu: boolean;
  displayLanguage: boolean;
  displayDirection: boolean;
}

const initialState = {
  displayMenu: true,
  displayLanguage: true,
  displayDirection: true,
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MENU': {
      return {
        ...state,
        displayMenu: true,
      };
    }
    case 'CLOSE_MENU': {
      return {
        ...state,
        displayMenu: false,
      };
    }
    case 'OPEN_LANGUAGE': {
      return {
        ...state,
        displayLanguage: true,
      };
    }
    case 'CLOSE_LANGUAGE': {
      return {
        ...state,
        displayLanguage: false,
      };
    }
    case 'OPEN_DIRECTION': {
      return {
        ...state,
        displayDirection: true,
      };
    }
    case 'CLOSE_DIRECTION': {
      return {
        ...state,
        displayDirection: false,
      };
    }
  }
}

export const UIProvider = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const openMenu = () => dispatch({ type: 'OPEN_MENU' });
  const closeMenu = () => dispatch({ type: 'CLOSE_MENU' });
  const openLanguage = () => dispatch({ type: 'OPEN_LANGUAGE' });
  const closeLanguage = () => dispatch({ type: 'CLOSE_LANGUAGE' });
  const openDirection = () => dispatch({ type: 'OPEN_DIRECTION' });
  const closeDirection = () => dispatch({ type: 'CLOSE_DIRECTION' });
  const value = React.useMemo(
    () => ({
      ...state,
      openMenu,
      closeMenu,
      openLanguage,
      closeLanguage,
      openDirection,
      closeDirection,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = () => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
