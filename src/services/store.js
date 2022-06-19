import { rootReducer } from './reducers/rootReducer';
import { compose, createStore, applyMiddleware } from 'redux';								
import thunk from 'redux-thunk';

import { socketMiddleware } from './middleware';

import { wsAuthUrl, wsUrl } from '../utils/data';
import { wsActions, wsAuthActions } from '../utils/ws';
								
const composeEnhancers =								
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__								
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})								
    : compose;								
								
const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions),
socketMiddleware(wsAuthUrl, wsAuthActions, true),));								
export const store = createStore(rootReducer, enhancer); 	