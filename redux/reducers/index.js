import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import authReducer from "./authReducer";

const middlewares = [thunk];

const enhancer = composeWithDevTools({})(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  rootAuth: authReducer
});

const store = createStore(rootReducer, enhancer);

export default store;
