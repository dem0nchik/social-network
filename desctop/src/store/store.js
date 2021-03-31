import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/index';
import { redirect } from '../reducers/middlewares/redirect'

const store = createStore(rootReducer, 
  applyMiddleware(thunk, redirect)
);

export default store;