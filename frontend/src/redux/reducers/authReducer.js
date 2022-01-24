/* eslint-disable default-param-last */
import authActionTypes from '../actions/actionTypes/auth';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null, errorMessage: null };

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case authActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case authActionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
        errorMessage: null,
      };
    case authActionTypes.LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        errorMessage: payload.message,
      };
    case authActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case authActionTypes.LOAD_USER:
      localStorage.setItem('user', JSON.stringify({ ...user, userInfo: payload.user }));
      return {
        ...state,
        user: { ...user, userInfo: payload.user },
      };
    default:
      return state;
  }
}
