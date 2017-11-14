import { reactReduxFirebase } from 'react-redux-firebase';
import { createStore, compose } from 'redux';
import firebaseConfig from './firebase';
import rootReducer from '../reducers';

const reduxFirebaseConfig = {
  userProfile: "users"
}

// // Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

if (module.hot) {
  module.hot.accept('../reducers', () => {
    const reducers = require('../reducers').default
    store.replaceReducer(reducers(store.asyncReducers))
  })
}

export default store;
