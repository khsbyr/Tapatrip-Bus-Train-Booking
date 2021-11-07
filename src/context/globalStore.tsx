import React, { FC, useCallback, useMemo, useState } from 'react';

export interface State {
  selectStartLocation: string;
  selectStopLocation: string;
  selectEndLocation: string;
  isUlaanbaatar: boolean;
  startLocationList: any;
  stopLocationList: any;
  endLocationList: any;
  selectedSeats: [];
}

const initialState = {
  selectStartLocation: '',
  selectStopLocation: '',
  selectEndLocation: '',
  isUlaanbaatar: true,
  startLocationList: '',
  stopLocationList: '',
  endLocationList: '',
  selectedSeats: '',
};

type Action =
  | {
      type: 'SET_SELECT_START_LOCATION';
      value: string;
    }
  | {
      type: 'SET_SELECT_STOP_LOCATION';
      value: string;
    }
  | {
      type: 'SET_SELECT_END_LOCATION';
      value: string;
    }
  | {
      type: 'SET_IS_ULAANBAATAR';
      value: boolean;
    }
  | {
      type: 'SET_START_LOCATION_LIST';
      value: any;
    }
  | {
      type: 'SET_STOP_LOCATION_LIST';
      value: any;
    }
  | {
      type: 'SET_END_LOCATION_LIST';
      value: any;
    }
  | {
      type: 'SET_SELECTED_SEATS';
      value: any;
    };

export const GlobalContext = React.createContext<State | any>(initialState);

GlobalContext.displayName = 'GlobalContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'SET_SELECT_START_LOCATION': {
      return {
        ...state,
        selectStartLocation: action.value,
      };
    }
    case 'SET_SELECT_STOP_LOCATION': {
      return {
        ...state,
        selectStopLocation: action.value,
      };
    }
    case 'SET_SELECT_END_LOCATION': {
      return {
        ...state,
        selectEndLocation: action.value,
      };
    }
    case 'SET_IS_ULAANBAATAR': {
      return {
        ...state,
        isUlaanbaatar: action.value,
      };
    }
    case 'SET_START_LOCATION_LIST': {
      return {
        ...state,
        startLocationList: action.value,
      };
    }
    case 'SET_STOP_LOCATION_LIST': {
      return {
        ...state,
        stopLocationList: action.value,
      };
    }
    case 'SET_END_LOCATION_LIST': {
      return {
        ...state,
        endLocationList: action.value,
      };
    }
    case 'SET_SELECTED_SEATS': {
      return {
        ...state,
        selectedSeats: action.value,
      };
    }
  }
}

export const GlobalProvider: FC = props => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const setSelectStartLocation = useCallback(
    (value: string) => dispatch({ type: 'SET_SELECT_START_LOCATION', value }),
    [dispatch]
  );

  const setSelectStopLocation = useCallback(
    (value: string) => dispatch({ type: 'SET_SELECT_STOP_LOCATION', value }),
    [dispatch]
  );

  const setSelectEndLocation = useCallback(
    (value: string) => dispatch({ type: 'SET_SELECT_END_LOCATION', value }),
    [dispatch]
  );

  const setIsUlaanbaatar = useCallback(
    (value: boolean) => dispatch({ type: 'SET_IS_ULAANBAATAR', value }),
    [dispatch]
  );

  const setStartLocationList = useCallback(
    (value: any) => dispatch({ type: 'SET_START_LOCATION_LIST', value }),
    [dispatch]
  );

  const setStopLocationList = useCallback(
    (value: any) => dispatch({ type: 'SET_STOP_LOCATION_LIST', value }),
    [dispatch]
  );

  const setEndLocationList = useCallback(
    (value: any) => dispatch({ type: 'SET_END_LOCATION_LIST', value }),
    [dispatch]
  );

  const setSelectedSeats = useCallback(
    (value: any) => dispatch({ type: 'SET_SELECTED_SEATS', value }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      setSelectStartLocation,
      setSelectStopLocation,
      setSelectEndLocation,
      setIsUlaanbaatar,
      setStartLocationList,
      setStopLocationList,
      setEndLocationList,
      setSelectedSeats,
    }),
    [state]
  );

  return <GlobalContext.Provider value={value} {...props} />;
};

export const useGlobalStore = () => {
  const context = React.useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(`useGlobalStore must be used within a GlobalProvider`);
  }
  return context;
};

export const ManagedGlobalContext: FC = ({ children }) => (
  <GlobalProvider>{children}</GlobalProvider>
);
