import { createStore } from 'redux';
import signInReducer from './signIn/reducer';

const store = createStore(signInReducer);

export default store;