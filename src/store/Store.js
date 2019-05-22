import { createStore, combineReducers, compose } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import login from './modules/login/reducers';
import user from './modules/user/reducers';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  login,
  user,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export const store = createStore(persistedReducer, initialState, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));
export const persistor = persistStore(store);
