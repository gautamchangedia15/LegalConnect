import {
  CLEAR_ERRORS,
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
} from "../constants/appointmentController";

// appointment reducer
export const createAppointmentReducer = (
  state = { appointment: {}, loading: false },
  action
) => {
  switch (action.type) {
    case CREATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        appointment: {},
      };
    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointment: action.payload,
      };
    case CREATE_APPOINTMENT_FAIL:
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
