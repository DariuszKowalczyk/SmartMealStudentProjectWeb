import { createStore, combineReducers, compose } from 'redux';
import login from './modules/login/reducers';

const rootReducer = combineReducers({
  login,
});
const initialState = {};

export const store = createStore(rootReducer, initialState, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));
