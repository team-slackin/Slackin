import { createStore, combineReducers, applyMiddleware } from "redux"
import promiseMiddleware from "redux-promise-middleware"
import channelReducer from "./Ducks/channelReducer"
import friendReducer from "./Ducks/friendReducer"
import userReducer from "./Ducks/userReducer"
import subChannelReducer from "./Ducks/subChannelReducer"


import { composeWithDevTools } from "redux-devtools-extension"

const rootReducer = combineReducers({
  channelReducer,
  friendReducer,
  userReducer,
  subChannelReducer
})

export default createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(promiseMiddleware))
)
