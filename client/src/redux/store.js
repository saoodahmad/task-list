import { createStore, combineReducers, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';

import { composeWithDevTools } from 'redux-devtools-extension';
import authReducer from './reducers/auth';
import taskReducer from './reducers/task';
const reducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

const middlewares = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
