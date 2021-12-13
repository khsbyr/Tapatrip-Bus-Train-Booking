import React from 'react';

export interface State {
  listActive: boolean;
  displayModal: boolean;
  displayLanguage: boolean;
  displayDirection: boolean;
  displayBlock: boolean;
}

const initialState = {
  listActive: false,
  displayModal: false,
  displayLanguage: true,
  displayDirection: true,
  displayBlock: false,
};

export const UIContext = React.createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state, action) {
  switch (action.type) {
    case 'OPEN_LIST_ACTIVE': {
      return {
        ...state,
        listActive: true,
      };
    }
    case 'CLOSE_LIST_ACTIVE': {
      return {
        ...state,
        listActive: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
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
    case 'SET_DISPLAY_BLOCK': {
      return {
        ...state,
        displayBlock: true,
      };
    }
    case 'SET_DISPLAY_NONE': {
      return {
        ...state,
        displayBlock: false,
      };
    }
  }
}

export const UIProvider = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const openListActive = () => dispatch({ type: 'OPEN_LIST_ACTIVE' });
  const closeListActive = () => dispatch({ type: 'CLOSE_LIST_ACTIVE' });
  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });
  const openLanguage = () => dispatch({ type: 'OPEN_LANGUAGE' });
  const closeLanguage = () => dispatch({ type: 'CLOSE_LANGUAGE' });
  const openDirection = () => dispatch({ type: 'OPEN_DIRECTION' });
  const closeDirection = () => dispatch({ type: 'CLOSE_DIRECTION' });
  const setDisplayBlock = () => dispatch({ type: 'SET_DISPLAY_BLOCK' });
  const setDisplayNone = () => dispatch({ type: 'SET_DISPLAY_NONE' });
  const value = React.useMemo(
    () => ({
      ...state,
      openListActive,
      closeListActive,
      openModal,
      closeModal,
      openLanguage,
      closeLanguage,
      openDirection,
      closeDirection,
      setDisplayBlock,
      setDisplayNone,
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
