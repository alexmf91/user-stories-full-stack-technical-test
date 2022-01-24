import axios from 'axios';
import userActionTypes from '../actionTypes/auth';

export function authRegister(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/register`,
        userData,
      );
      dispatch({
        type: userActionTypes.REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.REGISTER_FAIL,
        message: error.message,
      });
    }
  };
}
export function authLogin(userData) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        userData,
      );
      localStorage.setItem('user', JSON.stringify(data));
      dispatch({
        type: userActionTypes.LOGIN_SUCCESS,
        payload: { user: data },
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.LOGIN_FAIL,
        payload: { message: error.message },
      });
    }
  };
}
export function authLogout() {
  return async (dispatch) => {
    localStorage.removeItem('user');
    dispatch({
      type: userActionTypes.LOGOUT,
    });
  };
}

export function getUserData(token) {
  return async (dispatch) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/profile`,
        config,
      );
      dispatch({
        type: userActionTypes.LOAD_USER,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: userActionTypes.LOAD_USER_FAIL,
        message: error.message,
      });
    }
  };
}
