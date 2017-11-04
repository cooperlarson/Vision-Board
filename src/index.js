import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers';

const middleware = [ thunk ];

const store = createStore(rootReducer, applyMiddleware(...middleware))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
