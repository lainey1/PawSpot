// frontend/src/store/spots.js
import { csrfFetch } from "./csrf";

// * Action Types *************************
const LOAD_SPOTS = "/spots/load";

// * Action Creators **********************
const loadSpots = (spots) => {
  return {
    type: LOAD_SPOTS,
    spots,
  };
};

// * Thunk Action Creators ****************
export const getSpots = () => async (dispatch) => {
  try {
    const response = csrfFetch("/api/spots");

    if (!response.ok) {
      console.error("Failed to load spots");
      return;
    }

    const data = await response.json();
    dispatch(loadSpots(data));
    return data;
  } catch (error) {
    console.error("LOADING SPOTS FAILED: ", error);
  }
};

// * Reducers ***************************
const spotsReducer = (state, action) => {
  const newState = {};

  switch (action.type) {
    case LOAD_SPOTS: {
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      return newState;
    }

    default:
      return state;
  }
};

export default spotsReducer;
