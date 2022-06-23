import axios from 'axios';
import {
  ADMIN_TOURNAMENTS_FAIL,
  ADMIN_TOURNAMENTS_REQUEST,
  ADMIN_TOURNAMENTS_SUCCESS,
  ALL_TOURNAMENTS_FAIL,
  ALL_TOURNAMENTS_REQUEST,
  ALL_TOURNAMENTS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TOURNAMENT_FAIL,
  DELETE_TOURNAMENT_REQUEST,
  DELETE_TOURNAMENT_SUCCESS,
  NEW_TOURNAMENT_REQUEST,
  NEW_TOURNAMENT_SUCCESS,
  TOURNAMENT_DETAILS_FAIL,
  TOURNAMENT_DETAILS_REQUEST,
  TOURNAMENT_DETAILS_SUCCESS,
  UPDATE_TOURNAMENT_FAIL,
  UPDATE_TOURNAMENT_REQUEST,
  UPDATE_TOURNAMENT_SUCCESS,
} from '../constants/tournamentConstants';

export const getTournaments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TOURNAMENTS_REQUEST });

    const { data } = await axios.get('/api/v1/single/tournament');

    dispatch({
      type: ALL_TOURNAMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TOURNAMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTournaments = (Data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TOURNAMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(
      `/api/v1/tournament/create`,
      Data,
      config
    );

    dispatch({
      type: NEW_TOURNAMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TOURNAMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete TOURNAMENT (user Admin)
export const deleteTournaments = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TOURNAMENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/tournament/${id}`);

    dispatch({
      type: DELETE_TOURNAMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TOURNAMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteTournaments = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TOURNAMENT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/tournament/${id}`);

    dispatch({
      type: DELETE_TOURNAMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TOURNAMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update TOURNAMENT (ADMIN)
export const updateTournaments = (id, Data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TOURNAMENT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/v1/user/tournament/${id}`,
      Data,
      config
    );

    dispatch({
      type: UPDATE_TOURNAMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TOURNAMENT_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAllTournaments = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TOURNAMENTS_REQUEST });

    const { data } = await axios.get(`/api/v1/get/all/tournament`);

    dispatch({
      type: ALL_TOURNAMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TOURNAMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getAdminTournaments = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TOURNAMENTS_REQUEST });

    const { data } = await axios.get(`/api/v1/get/all/tournament`);

    dispatch({
      type: ADMIN_TOURNAMENTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TOURNAMENTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Tournament Details
export const getTournamentDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TOURNAMENT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/tournament/${id}`);

    dispatch({
      type: TOURNAMENT_DETAILS_SUCCESS,
      payload: data.tournament,
    });
  } catch (error) {
    dispatch({
      type: TOURNAMENT_DETAILS_FAIL,
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
