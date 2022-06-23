import axios from 'axios';
import {
  ADMIN_PLAYERS_FAIL,
  ADMIN_PLAYERS_REQUEST,
  ADMIN_PLAYERS_SUCCESS,
  ALL_PLAYERS_FAIL,
  ALL_PLAYERS_REQUEST,
  ALL_PLAYERS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_PLAYER_FAIL,
  DELETE_PLAYER_REQUEST,
  DELETE_PLAYER_SUCCESS,
  NEW_PLAYER_REQUEST,
  NEW_PLAYER_SUCCESS,
  PLAYER_DETAILS_FAIL,
  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  UPDATE_PLAYER_FAIL,
  UPDATE_PLAYER_REQUEST,
  UPDATE_PLAYER_SUCCESS,
} from '../constants/playersConstants';

export const getPlayers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PLAYERS_REQUEST });

    const { data } = await axios.get('/api/v1/tournament/players/profile');

    dispatch({
      type: ALL_PLAYERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PLAYERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newPlayers = (Data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PLAYER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/v1/player/create`, Data, config);

    dispatch({
      type: NEW_PLAYER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAYER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete Player (user Admin)
export const deletePlayers = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PLAYER_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/player/${id}`);

    dispatch({
      type: DELETE_PLAYER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAYER_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeletePlayers = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PLAYER_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/tournament/player/profile/${id}`
    );

    dispatch({
      type: DELETE_PLAYER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PLAYER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Player (ADMIN)
export const updatePlayers = (id, Data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PLAYER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/user/player/${id}`, Data, config);

    dispatch({
      type: UPDATE_PLAYER_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PLAYER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminPlayers = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PLAYERS_REQUEST });

    const { data } = await axios.get(`/api/v1/get/all/player`);

    dispatch({
      type: ADMIN_PLAYERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_PLAYERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Player Details
export const getPlayerDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PLAYER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/player/${id}`);

    dispatch({
      type: PLAYER_DETAILS_SUCCESS,
      payload: data.Player,
    });
  } catch (error) {
    dispatch({
      type: PLAYER_DETAILS_FAIL,
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
