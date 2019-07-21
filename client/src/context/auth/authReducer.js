import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  AUTH_ERROR,
  CLEAR_ERRORS
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state };
    case REGISTER_FAIL:
      return { ...state };
    case USER_LOADED:
      return { ...state };
    case LOGIN_FAIL:
      return { ...state };
    case LOGIN_SUCCESS:
      return { ...state };
    case LOG_OUT:
      return { ...state };
    case AUTH_ERROR:
      return { ...state };
    case CLEAR_ERRORS:
      return { ...state };
    default:
      return state;
  }
};
