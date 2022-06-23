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
  DELETE_PLAYER_RESET,
  DELETE_PLAYER_SUCCESS,
  NEW_PLAYER_FAIL,
  NEW_PLAYER_REQUEST,
  NEW_PLAYER_RESET,
  NEW_PLAYER_SUCCESS,
  PLAYER_DETAILS_FAIL,
  PLAYER_DETAILS_REQUEST,
  PLAYER_DETAILS_SUCCESS,
  UPDATE_PLAYER_FAIL,
  UPDATE_PLAYER_REQUEST,
  UPDATE_PLAYER_RESET,
  UPDATE_PLAYER_SUCCESS,
} from '../constants/playersConstants';

export const playersReducer = (state = { Players: [] }, action) => {
  switch (action.type) {
    case ALL_PLAYERS_REQUEST:
    case ADMIN_PLAYERS_REQUEST:
      return {
        loading: true,
        Players: [],
      };

    case ALL_PLAYERS_SUCCESS:
      return {
        loading: false,
        Players: action.payload.player,
        playerCount: action.payload.player.Count,
      };

    case ADMIN_PLAYERS_SUCCESS:
      return {
        loading: false,
        Players: action.payload.player,
        playerCount: action.payload.player.Count,
      };

    case ALL_PLAYERS_FAIL:
    case ADMIN_PLAYERS_FAIL:
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

export const newPlayerReducer = (state = { Player: {} }, action) => {
  switch (action.type) {
    case NEW_PLAYER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_PLAYER_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        Player: action.payload.player,
      };

    case NEW_PLAYER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case NEW_PLAYER_RESET:
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
export const playerDetailsReducer = (state = { Player: {} }, action) => {
  switch (action.type) {
    case PLAYER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PLAYER_DETAILS_SUCCESS:
      return {
        loading: false,
        Player: action.payload,
      };

    case PLAYER_DETAILS_FAIL:
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
export const playerReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PLAYER_REQUEST:
    case UPDATE_PLAYER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DELETE_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_PLAYER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_PLAYER_FAIL:
    case UPDATE_PLAYER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_PLAYER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_PLAYER_RESET:
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
