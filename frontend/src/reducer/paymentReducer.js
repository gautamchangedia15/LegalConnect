import {
  CLEAR_ERRORS,
  CONFIRM_PAYMENT_FAIL,
  CONFIRM_PAYMENT_REQUEST,
  CONFIRM_PAYMENT_SUCCESS,
} from "../constants/paymentConstant";

// payment reducer
export const paymentConfirmationReducer = (
  state = { payment: {}, loading: false },
  action
) => {
  switch (action.type) {
    case CONFIRM_PAYMENT_REQUEST:
      return {
        ...state,
        loading: true,
        payment: {},
      };
    case CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        status: action.status,
        payment: action.payload,
      };
    case CONFIRM_PAYMENT_FAIL:
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
