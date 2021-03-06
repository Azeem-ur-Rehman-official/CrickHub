import {
  ADMIN_SCHEDULES_FAIL,
  ADMIN_SCHEDULES_REQUEST,
  ADMIN_SCHEDULES_SUCCESS,
  ALL_SCHEDULES_FAIL,
  ALL_SCHEDULES_REQUEST,
  ALL_SCHEDULES_SUCCESS,
  CLEAR_ERRORS,
  DELETE_SCHEDULE_FAIL,
  DELETE_SCHEDULE_REQUEST,
  DELETE_SCHEDULE_RESET,
  DELETE_SCHEDULE_SUCCESS,
  NEW_SCHEDULE_FAIL,
  NEW_SCHEDULE_REQUEST,
  NEW_SCHEDULE_RESET,
  NEW_SCHEDULE_SUCCESS,
  SCHEDULE_DETAILS_FAIL,
  SCHEDULE_DETAILS_REQUEST,
  SCHEDULE_DETAILS_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_RESET,
  UPDATE_SCHEDULE_SUCCESS,
} from '../constants/scheduleConstant';

export const schedulesReducer = (state = { schedules: [] }, action) => {
  switch (action.type) {
    case ALL_SCHEDULES_REQUEST:
    case ADMIN_SCHEDULES_REQUEST:
      return {
        loading: true,
        schedules: [],
      };

    case ALL_SCHEDULES_SUCCESS:
      return {
        loading: false,
        schedules: action.payload.schedule,
        SCHEDULEsCount: action.payload.schedule.Count,
      };

    case ADMIN_SCHEDULES_SUCCESS:
      return {
        loading: false,
        schedules: action.payload.schedule,
        SCHEDULEsCount: action.payload.schedule.Count,
      };

    case ALL_SCHEDULES_FAIL:
    case ADMIN_SCHEDULES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newScheduleReducer = (state = { schedules: {} }, action) => {
  switch (action.type) {
    case NEW_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_SCHEDULE_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        schedules: action.payload.schedule,
      };

    case NEW_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_SCHEDULE_RESET:
      return {
        ...state,
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const scheduleDetailsReducer = (state = { schedule: {} }, action) => {
  switch (action.type) {
    case SCHEDULE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SCHEDULE_DETAILS_SUCCESS:
      return {
        loading: false,
        schedule: action.payload,
      };

    case SCHEDULE_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const scheduleReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SCHEDULE_REQUEST:
    case UPDATE_SCHEDULE_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_SCHEDULE_FAIL:
    case UPDATE_SCHEDULE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_SCHEDULE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_SCHEDULE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
