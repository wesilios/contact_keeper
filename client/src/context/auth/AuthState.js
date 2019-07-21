import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
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

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const registerSuccess = () => {
    dispatch({
      type: REGISTER_SUCCESS,
      patch: {}
    });
  };
  const registerFail = () => {
    dispatch({
      type: REGISTER_FAIL,
      patch: {}
    });
  };
  const userLoad = () => {
    dispatch({
      type: USER_LOADED,
      patch: {}
    });
  };
  const loginSuccess = () => {
    dispatch({
      type: LOGIN_SUCCESS,
      patch: {}
    });
  };
  const loginFail = () => {
    dispatch({
      type: LOGIN_FAIL,
      patch: {}
    });
  };

  const logOut = () => {
    dispatch({
      type: LOG_OUT,
      patch: {}
    });
  };

  const authError = () => {
    dispatch({
      type: AUTH_ERROR,
      patch: {}
    });
  };

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS,
      patch: {}
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        registerSuccess,
        registerFail,
        loginSuccess,
        loginFail,
        logOut,
        userLoad,
        authError,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
