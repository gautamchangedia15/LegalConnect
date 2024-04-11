import {
  CLEAR_ERRORS,
  GET_PROVIDER_FAIL,
  GET_PROVIDER_REQUEST,
  GET_PROVIDER_SUCCESS,
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
