import axios from 'axios';
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
  DELETE_SCHEDULE_SUCCESS,
  NEW_SCHEDULE_FAIL,
  NEW_SCHEDULE_REQUEST,
  NEW_SCHEDULE_SUCCESS,
  SCHEDULE_DETAILS_FAIL,
  SCHEDULE_DETAILS_REQUEST,
  SCHEDULE_DETAILS_SUCCESS,
  UPDATE_SCHEDULE_FAIL,
  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
} from '../constants/scheduleConstant';

export const getSchdules = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_SCHEDULES_REQUEST });

    const { data } = await axios.get('/api/v1/single/SCHEDULE');

    dispatch({
      type: ALL_SCHEDULES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCHEDULES_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getSingleTournamentSchdules = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_SCHEDULES_REQUEST });

    const { data } = await axios.get(
      `/api/v1/single/tournament/schedules/${id}`
    );

    dispatch({
      type: ALL_SCHEDULES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SCHEDULES_FAIL,
      payload: error.response.data.message,
    });
  }
};
//getSingleTournamentSCHEDULEs

export const newSchdules = (Data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SCHEDULE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/v1/tournament/schedule/create`,
      Data,
      config
    );

    dispatch({
      type: NEW_SCHEDULE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: NEW_SCHEDULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete TOURNAMENT (user Admin)
export const deleteSchdules = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SCHEDULE_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/schedule/${id}`);

    dispatch({
      type: DELETE_SCHEDULE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCHEDULE_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteSchdules = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SCHEDULE_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/schedule/${id}`);

    dispatch({
      type: DELETE_SCHEDULE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SCHEDULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update TOURNAMENT (ADMIN)
export const UpdateSchedules = (id, Data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SCHEDULE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/tournament/schedule/${id}`,
      Data,
      config
    );

    dispatch({
      type: UPDATE_SCHEDULE_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_SCHEDULE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminSchdules = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_SCHEDULES_REQUEST });

    const { data } = await axios.get(`/api/v1/get/all/SCHEDULE`);

    dispatch({
      type: ADMIN_SCHEDULES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SCHEDULES_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Tournament Details
export const getScheduleDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: SCHEDULE_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/tournament/schedule/${id}`);

    dispatch({
      type: SCHEDULE_DETAILS_SUCCESS,
      payload: data.schedule,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
