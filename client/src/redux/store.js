import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from "./users/usersReducer";
import controllerReducers from "./controller/controllerReducers";

import ReduxThunk from 'redux-thunk';

const rootReducer = combineReducers({
  user: userReducer,
  controller : controllerReducers
});

const middleware = [ReduxThunk];
const enhancer = applyMiddleware(...middleware);

const store = createStore(rootReducer, composeWithDevTools(enhancer));

export default store;