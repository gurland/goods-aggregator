import React, { createContext, useReducer } from 'react';
import actions from './actions';

import { getLanguageFromLS, getDarkThemeFromLS } from '../helpers';

const initialStore = {
  filters: [],
  selectedFilters: {},
  sidebarVisible: false,
  contentLanguage: getLanguageFromLS(),
  darkTheme: getDarkThemeFromLS(),
  searchQuery: '',
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
      case actions.SELECT_FILTERS:
        return {
          ...state,
          selectedFilters: action.payload,
        };
      case actions.SIDEBAR_TOGGLE:
        return {
          ...state,
          sidebarVisible: action.payload,
        };
      case actions.SET_CONTENT_LANGUAGE:
        return {
          ...state,
          contentLanguage: action.payload,
        };
      case actions.DARK_THEME_TOGGLE:
        return {
          ...state,
          darkTheme: action.payload,
        };
      case actions.SAVE_SEARCH_QUERY:
        return {
          ...state,
          searchQuery: action.payload,
        };
      default:
        return state;
    }
  }, initialStore);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default StoreProvider;
