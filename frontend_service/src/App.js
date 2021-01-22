import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Homepage, Details } from './pages';
import { links } from './utils/constants';

function App() {
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
      <Navbar position={'bottom'} />
    </Router>
  );
}

export default App;
