import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/auth';
import { BASE_URL } from '../../utils/api';
import { getError } from '../../utils/error';
import { removeToken, storeToken } from '../../utils/auth';

export const login = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestData = { ...credentials }; // the content that is sent as request's body

    const { data } = await axios.post(
      `${BASE_URL}/auth/login`,
      requestData,
      config
    );

    storeToken(data.token);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: getError(error),
    });
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const requestData = { ...credentials }; // the content that is sent as request's body

    const { data } = await axios.post(
      `${BASE_URL}/auth/register`,
      requestData,
      config
    );
    storeToken(data.token);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: getError(error),
    });
  }
};

export const logout = () => async (dispatch) => {
  removeToken();
  dispatch({
    type: USER_LOGOUT,
  });
};
