import React, { useEffect, useContext } from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Homepage, Details } from './pages';
import { links, languageLSKey } from './utils/constants';
import { store } from './utils/store';

function App() {
  const { state } = useContext(store);

  useEffect(() => {
    localStorage.setItem(languageLSKey, state.contentLanguage);
  }, [state.contentLanguage]);

  return (
    <Router>
      <Navbar position={'top'} />
      <Switch>
        <Route path={links.homepage} exact>
          <Homepage />
        </Route>
        <Route path={links.details}>
          <Details />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
