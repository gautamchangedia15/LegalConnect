import axios from "axios";
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
import { server } from "../store";

// action for get all provider
export const getProvider = (city, exp, name) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PROVIDER_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/provider/getall?city=${city}&expertise_area=${exp}&name=${name}`
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

// to get single provider

export const getProviderDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SINGLE_PROVIDER_REQUEST,
    });
    const { data } = await axios.get(`${server}/provider/getProfile/${id}`);
    dispatch({
      type: GET_SINGLE_PROVIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PROVIDER_FAIL,
      error: error,
    });
  }
};

// to load user provider

export const loadProvider = () => async (dispatch) => {
  try {
    dispatch({
      type: LOAD_PROVIDER_REQUEST,
    });
    const { data } = await axios.get(
      `${server}/auth/provider/loadprovider`,

      { withCredentials: true }
    );
    dispatch({
      type: LOAD_PROVIDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_PROVIDER_FAIL,
      error: error.message,
    });
  }
};
