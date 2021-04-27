import { createStore, applyMiddleware } from 'redux';
import signInReducer from './signIn/reducer';
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
const middleware = [logger]
//method that allows to save the state data to localStorage
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('state', serializedState);
    } catch (err) {
        console.log(err);
    }
}
//method that allows to load the state data to localStorage
function loadFromLocalStorage() {
    try {
        const serializedState = sessionStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch (err) {
        console.log(err)
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();

const store = createStore(signInReducer,persistedState, composeWithDevTools(applyMiddleware(...middleware)));

store.subscribe(() => saveToLocalStorage(store.getState()));


export default store;