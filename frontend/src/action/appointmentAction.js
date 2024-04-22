import { server } from "../store";
import axios from "axios";
import {
  CLEAR_ERRORS,
  CREATE_APPOINTMENT_FAIL,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
} from "../constants/appointmentController";
// to create appointment action

export const createAppointment = (slotData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_APPOINTMENT_REQUEST,
    });
    const { data } = await axios.post(
      `${server}/booking/addSlot`,
      { ...slotData },
      { withCredentials: true }
    );
    dispatch({
      type: CREATE_APPOINTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_APPOINTMENT_FAIL,
      error: error.message,
    });
  }
};
