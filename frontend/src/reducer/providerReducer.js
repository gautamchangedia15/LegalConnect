import {
  CLEAR_ERRORS,
  GET_PROVIDER_FAIL,
  GET_PROVIDER_REQUEST,
  GET_PROVIDER_SUCCESS,
  GET_SINGLE_PROVIDER_REQUEST,
  GET_SINGLE_PROVIDER_SUCCESS,
  GET_SINGLE_PROVIDER_FAIL,
  LOAD_PROVIDER_REQUEST,
  LOAD_PROVIDER_SUCCESS,
  LOAD_PROVIDER_FAIL,
} from "../constants/providerConstant";

// provider reducer
export const providerReducer = (
  state = { providers: [], loading: false },
  action
) => {
  switch (action.type) {
    case GET_PROVIDER_REQUEST:
      return {
        ...state,
        loading: true,
        providers: [],
      };
    case GET_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        providers: action.payload,
      };
    case GET_PROVIDER_FAIL:
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

// for single provider

// provider reducer
export const singleProviderReducer = (
  state = { provider: {}, loading: false },
  action
) => {
  switch (action.type) {
    case GET_SINGLE_PROVIDER_REQUEST:
      return {
        ...state,
        loading: true,
        provider: {},
      };
    case GET_SINGLE_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        provider: action.payload,
      };
    case GET_SINGLE_PROVIDER_FAIL:
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

// load Provider
export const loadProviders = (
  state = { Provider: {}, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_PROVIDER_REQUEST:
      return {
        ...state,
        loading: true,
        Provider: {},
      };
    case LOAD_PROVIDER_SUCCESS:
      return {
        ...state,
        loading: false,
        Provider: action.payload,
      };
    case LOAD_PROVIDER_FAIL:
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
