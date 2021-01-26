import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { StoreProvider } from './utils/store';
import 'semantic-ui-css/semantic.min.css';
import './styles/custom.scss';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
