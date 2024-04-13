import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  providerReducer,
  singleProviderReducer,
} from "./reducer/providerReducer";

const reducer = combineReducers({
  provider: providerReducer,
  providerDetails: singleProviderReducer,
});

let initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export const server = "http://localhost:3000";
export default store;
