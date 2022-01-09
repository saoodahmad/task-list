import {
  FETCH_MY_TASKS_REQUEST,
  FETCH_MY_TASKS_SUCCESS,
  FETCH_MY_TASKS_FAIL,
  ADD_MY_TASK_REQUEST,
  ADD_MY_TASK_SUCCESS,
  ADD_MY_TASK_FAIL,
  UPDATE_MY_TASK_REQUEST,
  UPDATE_MY_TASK_SUCCESS,
  UPDATE_MY_TASK_FAIL,
  DELETE_MY_TASK_REQUEST,
  DELETE_MY_TASK_SUCCESS,
  DELETE_MY_TASK_FAIL,
} from '../constants/task';

const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_MY_TASKS_REQUEST:
      return { loading: true };
    case FETCH_MY_TASKS_SUCCESS:
      return { loading: false, data: action.payload };
    case FETCH_MY_TASKS_FAIL:
      return { loading: false, error: action.payload };

    case ADD_MY_TASK_REQUEST:
      return { loading: true };
    case ADD_MY_TASK_SUCCESS:
      return { loading: false, data: action.payload };
    case ADD_MY_TASK_FAIL:
      return { loading: false, error: action.payload };

    case UPDATE_MY_TASK_REQUEST:
      return { loading: true };
    case UPDATE_MY_TASK_SUCCESS:
      return { loading: false, data: action.payload };
    case UPDATE_MY_TASK_FAIL:
      return { loading: false, error: action.payload };

    case DELETE_MY_TASK_REQUEST:
      return { loading: true };
    case DELETE_MY_TASK_SUCCESS:
      return { loading: false, data: action.payload };
    case DELETE_MY_TASK_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export default taskReducer;
