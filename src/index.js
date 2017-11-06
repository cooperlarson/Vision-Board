import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './css/index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebaseConfig from './actions/firebase';
import { reactReduxFirebase } from 'react-redux-firebase';

import rootReducer from './reducers';

const reduxFirebaseConfig = { goalsList: 'goals'}

// // Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore)

const initialState = {}
const store = createStoreWithFirebase(rootReducer, initialState)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
registerServiceWorker();
