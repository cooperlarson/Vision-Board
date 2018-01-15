import { reactReduxFirebase } from 'react-redux-firebase';
import { createStore, compose } from 'redux';
import firebaseConfig from './firebase';
import rootReducer from '../reducers';

const reduxFirebaseConfig = { goalsList: 'goals'}

// // Add reactReduxFirebase store enhancer
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebaseConfig, reduxFirebaseConfig),
)(createStore);

const initialState = {};
const store = createStoreWithFirebase(rootReducer, initialState);

export default store;
