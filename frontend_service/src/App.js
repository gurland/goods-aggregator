import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Navbar } from './components';
import { Homepage } from './pages';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
