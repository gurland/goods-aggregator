import React, { createContext, useReducer } from 'react';
import actions from './actions';

const initialStore = {
  filters: [],
};
export const store = createContext(initialStore);

// eslint-disable-next-line react/prop-types
function StoreProvider({ children }) {
  const { Provider } = store;
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case actions.SAVE_FETCHED_FILTERS:
        return {
          ...state,
          filters: action.payload,
        };
      default:
        return state;
    }
  }, initialStore);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default StoreProvider;
