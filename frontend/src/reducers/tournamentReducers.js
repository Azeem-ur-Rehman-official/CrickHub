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
  DELETE_TOURNAMENT_RESET,
  DELETE_TOURNAMENT_SUCCESS,
  NEW_TOURNAMENT_FAIL,
  NEW_TOURNAMENT_REQUEST,
  NEW_TOURNAMENT_RESET,
  NEW_TOURNAMENT_SUCCESS,
  TOURNAMENT_DETAILS_FAIL,
  TOURNAMENT_DETAILS_REQUEST,
  TOURNAMENT_DETAILS_SUCCESS,
  UPDATE_TOURNAMENT_FAIL,
  UPDATE_TOURNAMENT_REQUEST,
  UPDATE_TOURNAMENT_RESET,
  UPDATE_TOURNAMENT_SUCCESS,
} from '../constants/tournamentConstants';

export const tournamentsReducer = (state = { Tournaments: [] }, action) => {
  switch (action.type) {
    case ALL_TOURNAMENTS_REQUEST:
    case ADMIN_TOURNAMENTS_REQUEST:
      return {
        loading: true,
        Tournaments: [],
      };

    case ALL_TOURNAMENTS_SUCCESS:
      return {
        loading: false,
        Tournaments: action.payload.tournament,
        TornamentCount: action.payload.tournament.Count,
      };

    case ADMIN_TOURNAMENTS_SUCCESS:
      return {
        loading: false,
        Tournaments: action.payload.tournament,
        TornamentCount: action.payload.tournament.Count,
      };

    case ALL_TOURNAMENTS_FAIL:
    case ADMIN_TOURNAMENTS_FAIL:
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

export const newTournamentReducer = (state = { Tournament: {} }, action) => {
  switch (action.type) {
    case NEW_TOURNAMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_TOURNAMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        Tournament: action.payload.tournament,
      };

    case NEW_TOURNAMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_TOURNAMENT_RESET:
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
export const tournamentDetailsReducer = (
  state = { tournament: {} },
  action
) => {
  switch (action.type) {
    case TOURNAMENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TOURNAMENT_DETAILS_SUCCESS:
      return {
        loading: false,
        tournament: action.payload,
      };

    case TOURNAMENT_DETAILS_FAIL:
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
export const tournamentReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TOURNAMENT_REQUEST:
    case UPDATE_TOURNAMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_TOURNAMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_TOURNAMENT_FAIL:
    case UPDATE_TOURNAMENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_TOURNAMENT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_TOURNAMENT_RESET:
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
