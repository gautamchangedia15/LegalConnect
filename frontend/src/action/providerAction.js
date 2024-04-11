import axios from "axios";
import {
  CLEAR_ERRORS,
  GET_PROVIDER_FAIL,
  GET_PROVIDER_REQUEST,
  GET_PROVIDER_SUCCESS,
} from "../constants/providerConstant";
import { server } from "../store";

// action for get all provider
export const getProvider = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROVIDER_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/provider/getall?keyword=${keyword}`
    );

    dispatch({
      type: GET_PROVIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROVIDER_FAIL,
      error: error,
    });
  }
};
