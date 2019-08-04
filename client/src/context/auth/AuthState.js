import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
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
    loading: false,
    error: null,
    user: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  const register = async data => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/users', data, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.message
      });
    }
  };
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      if (state.user === null) {
        try {
          const res = await axios.get('/api/auth');
          dispatch({
            type: USER_LOADED,
            payload: res.data
          });
        } catch (err) {
          dispatch({
            type: AUTH_ERROR
          });
        }
      }
    }
  };

  const login = async data => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    };
    try {
      const res = await axios.post('/api/auth', data, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.message
      });
    }
  };

  const logOut = () =>
    dispatch({
      type: LOG_OUT
    });

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
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
        register,
        login,
        logOut,
        loadUser,
        clearErrors
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
