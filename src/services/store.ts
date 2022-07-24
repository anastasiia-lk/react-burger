// import { rootReducer } from './reducers/rootReducer';
// import { compose, createStore, applyMiddleware } from 'redux';								
// import thunk from 'redux-thunk';

// import { socketMiddleware } from './middleware';

// import { wsAuthUrl, wsUrl } from '../utils/data';
// import { wsActions, wsAuthActions } from '../utils/ws';
								
// const composeEnhancers =								
//   typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__								
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})								
//     : compose;								
								
// const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions),
// socketMiddleware(wsAuthUrl, wsAuthActions, true),));								
// export const store = createStore(rootReducer, enhancer); 	

import { configureStore } from '@reduxjs/toolkit';
import { socketMiddleware } from './middleware';
import { rootReducer } from './reducers/rootReducer';

import { wsOptions } from './actions/wsActions';
import {  wsAuthOptions } from './actions/wsAuthActions';

import { wsAuthUrl, wsUrl } from '../utils/data';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      socketMiddleware(wsUrl, wsOptions),
      socketMiddleware(wsAuthUrl, wsAuthOptions, true)
    ),
  devTools: process.env.NODE_ENV !== 'production',
});