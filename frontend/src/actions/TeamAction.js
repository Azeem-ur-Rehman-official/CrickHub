import axios from 'axios';
import {
  ADMIN_TEAMS_FAIL,
  ADMIN_TEAMS_REQUEST,
  ADMIN_TEAMS_SUCCESS,
  ALL_TEAMS_FAIL,
  ALL_TEAMS_REQUEST,
  ALL_TEAMS_SUCCESS,
  CLEAR_ERRORS,
  DELETE_TEAM_FAIL,
  DELETE_TEAM_REQUEST,
  DELETE_TEAM_SUCCESS,
  NEW_TEAM_FAIL,
  NEW_TEAM_REQUEST,
  NEW_TEAM_SUCCESS,
  TEAM_DETAILS_FAIL,
  TEAM_DETAILS_REQUEST,
  TEAM_DETAILS_SUCCESS,
  UPDATE_TEAM_FAIL,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_SUCCESS,
} from '../constants/teamsConstant';

export const getTeams = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_TEAMS_REQUEST });

    const { data } = await axios.get('/api/v1/single/team');

    dispatch({
      type: ALL_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TEAMS_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const getSingleTournamentTeams = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_TEAMS_REQUEST });

    const { data } = await axios.get(`/api/v1/single/tournament/teams/${id}`);
    console.log(data);
    dispatch({
      type: ALL_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_TEAMS_FAIL,
      payload: error.response.data.message,
    });
  }
};
//getSingleTournamentTeams

export const newTeams = (Data) => async (dispatch) => {
  try {
    dispatch({ type: NEW_TEAM_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`/api/v1/team/create`, Data, config);

    dispatch({
      type: NEW_TEAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete TOURNAMENT (user Admin)
export const deleteTeams = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEAM_REQUEST });

    const { data } = await axios.delete(`/api/v1/user/team/${id}`);

    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};
export const adminDeleteTeams = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TEAM_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/team/${id}`);

    dispatch({
      type: DELETE_TEAM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update TOURNAMENT (ADMIN)
export const updateTeams = (id, Data) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TEAM_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(`/api/v1/user/team/${id}`, Data, config);

    dispatch({
      type: UPDATE_TEAM_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_TEAM_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAdminTeams = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TEAMS_REQUEST });

    const { data } = await axios.get(`/api/v1/get/all/team`);

    dispatch({
      type: ADMIN_TEAMS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_TEAMS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Tournament Details
export const getTeamDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TEAM_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/user/team/${id}`);

    dispatch({
      type: TEAM_DETAILS_SUCCESS,
      payload: data.team,
    });
  } catch (error) {
    dispatch({
      type: TEAM_DETAILS_FAIL,
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
