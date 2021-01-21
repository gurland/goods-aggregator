import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import 'semantic-ui-css/semantic.min.css';
import './customSemanticUi.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
