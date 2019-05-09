import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import channelReducer from './Ducks/channelReducer';
import friendReducer from './Ducks/friendReducer';
import userReducer from './Ducks/userReducer';

const rootReducer = combineReducers({
  channelReducer,
  friendReducer,
  userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));