import {
  LOAD_CLIENT_REQUEST,
  LOAD_CLIENT_SUCCESS,
  LOAD_CLIENT_FAIL,
  LOGOUT_CLIENT_REQUEST,
  LOGOUT_CLIENT_SUCCESS,
  LOGOUT_CLIENT_FAIL,
  CLEAR_ERRORS,
} from "../constants/clientsController";

// load Client
export const loadClient = (state = { client: {}, loading: false }, action) => {
  switch (action.type) {
    case LOAD_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
        client: {},
      };
    case LOAD_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload,
      };
    case LOAD_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// logout client
export const logoutClient = (state = { loading: false }, action) => {
  switch (action.type) {
    case LOGOUT_CLIENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOGOUT_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case LOGOUT_CLIENT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
