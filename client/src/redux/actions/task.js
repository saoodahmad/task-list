import axios from 'axios';
import { getToken } from '../../utils/auth';
import { getError } from '../../utils/error';
import { BASE_URL } from '../../utils/api';
import {
  ADD_MY_TASK_FAIL,
  ADD_MY_TASK_REQUEST,
  ADD_MY_TASK_SUCCESS,
  DELETE_MY_TASK_FAIL,
  DELETE_MY_TASK_REQUEST,
  DELETE_MY_TASK_SUCCESS,
  FETCH_MY_TASKS_FAIL,
  FETCH_MY_TASKS_REQUEST,
  FETCH_MY_TASKS_SUCCESS,
  UPDATE_MY_TASK_FAIL,
  UPDATE_MY_TASK_REQUEST,
  UPDATE_MY_TASK_SUCCESS,
} from '../constants/task';

export const addTask = (task) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_MY_TASK_REQUEST,
    });

    const token = getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const requestData = { ...task }; // the content that is sent as request's body

    const { data } = await axios.post(
      `${BASE_URL}/task/add-task`,
      requestData,
      config
    );

    dispatch({
      type: ADD_MY_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_MY_TASK_FAIL,
      payload: getError(error),
    });
  }
};

export const fetchMyTasks = () => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_MY_TASKS_REQUEST,
    });

    const token = getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/task/get-my-tasks`, config);

    dispatch({
      type: FETCH_MY_TASKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_MY_TASKS_FAIL,
      payload: getError(error),
    });
  }
};

export const updateMyTask = (taskID, task) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MY_TASK_REQUEST,
    });

    const token = getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const requestData = { ...task };

    const { data } = await axios.put(
      `${BASE_URL}/task/update-task/${taskID}`,
      requestData,
      config
    );

    dispatch({
      type: UPDATE_MY_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MY_TASK_FAIL,
      payload: getError(error),
    });
  }
};

export const deleteMyTask = (taskID) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_MY_TASK_REQUEST,
    });

    const token = getToken();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(
      `${BASE_URL}/task/delete-task/${taskID}`,
      config
    );

    dispatch({
      type: DELETE_MY_TASK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MY_TASK_FAIL,
      payload: getError(error),
    });
  }
};
