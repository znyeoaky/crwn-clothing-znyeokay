import { compose, createStore, applyMiddleware, Middleware } from 'redux';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { rootReducer } from './root-reducer';


export type RootState = ReturnType<typeof rootReducer>;

declare global {
  interface Window{
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
};

type ExtendedPersistConfig = PersistConfig<RootState> & {
  whitelist: (keyof RootState)[];
}

const persistConfig: ExtendedPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
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
  sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware));

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
