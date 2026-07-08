import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import { App as Toast } from 'antd';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Toast>
      <App />
    </Toast>
  </Provider>
);

reportWebVitals();
