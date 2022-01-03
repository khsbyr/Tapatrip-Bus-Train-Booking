import React, { FC, useCallback, useMemo } from 'react';

export interface State {
  startStationID: string;
  endStationID: string;
  startStationName: string;
  endStationName: string;
}

const initialState = {
  startStationID: '',
  endStationID: '',
  startStationName: '',
  endStationName: '',
};

type Action =
  | {
      type: 'SET_START_STATION_ID';
      value: string;
    }
  | {
      type: 'SET_END_STATION_ID';
      value: string;
    }
  | {
      type: 'SET_START_STATION_NAME';
      value: string;
    }
  | {
      type: 'SET_END_STATION_NAME';
      value: string;
    };

export const GlobalContext = React.createContext<State | any>(initialState);

GlobalContext.displayName = 'GlobalContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_START_STATION_ID': {
      return {
        ...state,
        startStationID: action.value,
      };
    }
    case 'SET_END_STATION_ID': {
      return {
        ...state,
        endStationID: action.value,
      };
    }

    case 'SET_START_STATION_NAME': {
      return {
        ...state,
        startStationName: action.value,
      };
    }

    case 'SET_END_STATION_NAME': {
      return {
        ...state,
        endStationName: action.value,
      };
    }
  }
}

export const GlobalProvider: FC = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setStartStationID = useCallback(
    (value: string) => dispatch({ type: 'SET_START_STATION_ID', value }),
    [dispatch]
  );

  const setEndStationID = useCallback(
    (value: string) => dispatch({ type: 'SET_END_STATION_ID', value }),
    [dispatch]
  );

  const setStartStationName = useCallback(
    (value: string) => dispatch({ type: 'SET_START_STATION_NAME', value }),
    [dispatch]
  );

  const setEndStationName = useCallback(
    (value: string) => dispatch({ type: 'SET_END_STATION_NAME', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      setStartStationID,
      setEndStationID,
      setStartStationName,
      setEndStationName,
    }),
    [state]
  );

  return <GlobalContext.Provider value={value} {...props} />;
};

export const useTrainContext = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(`useGlobalStore must be used within a GlobalProvider`);
  }
  return context;
};

export const ManagedTrainContext: FC = ({ children }) => (
  <GlobalProvider>{children}</GlobalProvider>
);
