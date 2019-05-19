import { createStore, combineReducers, compose } from 'redux';
import login from './modules/login/reducers';
import calendar from './modules/calendar/reducers';

const rootReducer = combineReducers({
  login,
  calendar,
});
const initialState = {};

export const store = createStore(rootReducer, initialState, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));
