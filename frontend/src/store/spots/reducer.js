// * Reducers **********
// Handle state updates based on dispatch actions. Pure functions taking current state and action as inputs to return a new state

import {
  LOAD_SPOTS,
  LOAD_SPOT,
  CREATE_SPOT,
  UPDATE_SPOT,
  DELETE_SPOT,
} from "./types";

const initialState = { currentSpot: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, ...action.spots };

    case LOAD_SPOT:
      return { ...state, currentSpot: action.spot };

    case CREATE_SPOT:
      return { ...state, entries: [...state.entries, action.spot] };

    case UPDATE_SPOT:
      return {
        ...state,
        entries: state.entries.map((spot) =>
          spot.id === action.spot.id ? action.spot : spot
        ),
      };

    case DELETE_SPOT:
      return {
        ...state,
        entries: state.entries.filter((spot) => spot.id !== action.spotId),
      };

    default:
      return state;
  }
};

export default spotsReducer;
