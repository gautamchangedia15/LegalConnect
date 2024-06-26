import {
  LOAD_CLIENT_REQUEST,
  LOAD_CLIENT_SUCCESS,
  LOAD_CLIENT_FAIL,
  LOGOUT_CLIENT_REQUEST,
  LOGOUT_CLIENT_SUCCESS,
  LOGOUT_CLIENT_FAIL,
} from "../constants/clientsController";
import { server } from "../store";
import axios from "axios";

// to load user provider

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_CLIENT_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/auth/client/currentClient`,

      { withCredentials: true }
    );
    dispatch({
      type: LOAD_CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CLIENT_FAIL,
      error: error.message,
    });
  }
};

// to logout client provider

export const logoutClient = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_CLIENT_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/auth/client/logout`,

      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: LOGOUT_CLIENT_SUCCESS,
      payload: ("hello", data.message),
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_CLIENT_FAIL,
      error: error.message,
    });
  }
};
