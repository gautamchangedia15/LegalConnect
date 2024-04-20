import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import {
  loadProviders,
  providerReducer,
  singleProviderReducer,
} from "./reducer/providerReducer";
import { loadClient, logoutClient } from "./reducer/clientsReducer";
import { authReducer } from "./reducer/authReducer";

const reducer = combineReducers({
  provider: providerReducer,
  providerDetails: singleProviderReducer,
  user: loadClient,
  auth: authReducer,
  logoutClient: logoutClient,
  loadProviders,
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
