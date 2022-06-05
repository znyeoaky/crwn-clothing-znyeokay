import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
// import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';


import { rootReducer } from './root-reducer';
import { rootSaga } from './root-saga';


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

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleWares = [logger];
// production // development
const middleWares = [
  process.env.NODE_ENV === 'development' && logger, 
  sagaMiddleware].filter(
  Boolean
);

const composedEnhancer = (
  process.env.NODE_ENV !== 'production' && 
  window && 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || 
compose;


const composedEnhancers = composedEnhancer(applyMiddleware(...middleWares));

export const store = createStore(
  persistedReducer, 
  undefined, 
  composedEnhancers
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
