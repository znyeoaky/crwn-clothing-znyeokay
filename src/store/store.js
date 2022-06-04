import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';


const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user'],
};
/*
  key: We want to start from the root level.
  storage(shorthand): So by default in any web browser, 
  this will just use local storage, which is what we want.
  blacklist: an array of strings(root-reducer.js), which reducer you don't want to persist.
*/

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [logger];
// production
const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

export const persistor = persistStore(store);
