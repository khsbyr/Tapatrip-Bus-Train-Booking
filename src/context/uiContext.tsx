import React from 'react';

export interface State {
  listActive: boolean;
  displayModal: boolean;
}

const initialState = {
  listActive: false,
  displayModal: false,
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
  }
}

export const UIProvider = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);
  const openListActive = () => dispatch({ type: 'OPEN_LIST_ACTIVE' });
  const closeListActive = () => dispatch({ type: 'CLOSE_LIST_ACTIVE' });
  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  const value = React.useMemo(
    () => ({
      ...state,
      openListActive,
      closeListActive,
      openModal,
      closeModal,
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
