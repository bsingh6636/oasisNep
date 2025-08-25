import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './component/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './component/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </Provider>
  // </React.StrictMode>
);


