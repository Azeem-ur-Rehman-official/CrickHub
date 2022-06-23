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
  DELETE_TEAM_RESET,
  DELETE_TEAM_SUCCESS,
  NEW_TEAM_FAIL,
  NEW_TEAM_REQUEST,
  NEW_TEAM_RESET,
  NEW_TEAM_SUCCESS,
  TEAM_DETAILS_FAIL,
  TEAM_DETAILS_REQUEST,
  TEAM_DETAILS_SUCCESS,
  UPDATE_TEAM_FAIL,
  UPDATE_TEAM_REQUEST,
  UPDATE_TEAM_RESET,
  UPDATE_TEAM_SUCCESS,
} from '../constants/teamsConstant';

export const teamsReducer = (state = { Teams: [] }, action) => {
  switch (action.type) {
    case ALL_TEAMS_REQUEST:
      return {
        Teams: [],
      };
    case ADMIN_TEAMS_REQUEST:
      return {
        loading: true,
        Teams: [],
      };

    case ALL_TEAMS_SUCCESS:
      return {
        loading: false,
        Teams: action.payload.team,
        TeamsCount: action.payload.team.Count,
      };

    case ADMIN_TEAMS_SUCCESS:
      return {
        loading: false,
        Teams: action.payload.team,
        TeamsCount: action.payload.team.Count,
      };

    case ALL_TEAMS_FAIL:
    case ADMIN_TEAMS_FAIL:
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

export const newTeamReducer = (state = { Team: {} }, action) => {
  switch (action.type) {
    case NEW_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_TEAM_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        Teams: action.payload.team,
      };

    case NEW_TEAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_TEAM_RESET:
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
export const teamDetailsReducer = (state = { team: {} }, action) => {
  switch (action.type) {
    case TEAM_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TEAM_DETAILS_SUCCESS:
      return {
        loading: false,
        team: action.payload,
      };

    case TEAM_DETAILS_FAIL:
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
export const teamReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TEAM_REQUEST:
    case UPDATE_TEAM_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TEAM_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_TEAM_FAIL:
    case UPDATE_TEAM_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TEAM_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_TEAM_RESET:
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
