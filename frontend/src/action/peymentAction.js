import {
  CONFIRM_PAYMENT_FAIL,
  CONFIRM_PAYMENT_REQUEST,
  CONFIRM_PAYMENT_SUCCESS,
} from "../constants/paymentConstant";
import { server } from "../store";
import axios from "axios";

export const confirmPayment =
  ({ clientData, paymentData, slotData, servicesData, capturePayment }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: CONFIRM_PAYMENT_REQUEST,
      });
      // capture payment

      const { capturePaymentData } = await axios.post(
        `${server}/provider/razorpay/capturePayment`,
        {
          paymentId: capturePayment.razorpay_payment_id,
          amount: capturePayment.amount,
        }
      );
      dispatch({
        type: CONFIRM_PAYMENT_SUCCESS,
        status: "Payment captured successfully",
        payload: capturePaymentData,
      });

      const { addClientData } = await axios.post(
        `${server}/provider/addClientData`,
        { ...clientData }
      );
      dispatch({
        type: CONFIRM_PAYMENT_SUCCESS,
        status: "client data Added",
        payload: addClientData,
      });
      const { addPaymentData } = await axios.post(
        `${server}/provider/addPaymentData`,
        { ...paymentData }
      );
      dispatch({
        type: CONFIRM_PAYMENT_SUCCESS,
        status: "Payment data Added",
        payload: addPaymentData,
      });
      const { UpdateSlotData } = await axios.post(
        `${server}/booking/updateSlot`,
        { ...slotData }
      );
      dispatch({
        type: CONFIRM_PAYMENT_SUCCESS,
        status: "slot data Added",

        payload: UpdateSlotData,
      });
      const { addServicesData } = await axios.post(
        `${server}/client/addServices`,
        { ...servicesData }
      );
      dispatch({
        type: CONFIRM_PAYMENT_SUCCESS,
        status: "services data Added",

        payload: addServicesData,
      });
    } catch (error) {
      dispatch({
        type: CONFIRM_PAYMENT_FAIL,
        error: error,
      });
    }
  };
