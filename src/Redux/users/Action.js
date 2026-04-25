import axios from "axios";
import * as types from "./ActionTypes";
import { API_BASE_URL } from "@/Api/api";
const token = localStorage.getItem("jwt");
const authHeader = () => ({
  Authorization: `Bearer ${token}`,
});

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_ALL_USERS_REQUEST });

  try {
    const res = await axios.get(`${API_BASE_URL}/api/all-users`, {
      headers: authHeader(),
    });

    dispatch({
      type: types.GET_ALL_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_ALL_USERS_FAILURE,
      payload: err.message,
    });
  }
};

export const getVerifiedUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_VERIFIED_USERS_REQUEST });

  try {
    const res = await axios.get(`${API_BASE_URL}/api/all-users/verified`, {
      headers: authHeader(),
    });

    dispatch({
      type: types.GET_VERIFIED_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_VERIFIED_USERS_FAILURE,
      payload: err.message,
    });
  }
};

/* ================= NON VERIFIED USERS ================= */
export const getNonVerifiedUsers = () => async (dispatch) => {
  dispatch({ type: types.GET_NON_VERIFIED_USERS_REQUEST });

  try {
    const res = await axios.get(`${API_BASE_URL}/api/all-users/non-verified`, {
      headers: authHeader(),
    });

    dispatch({
      type: types.GET_NON_VERIFIED_USERS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: types.GET_NON_VERIFIED_USERS_FAILURE,
      payload: err.message,
    });
  }
};
