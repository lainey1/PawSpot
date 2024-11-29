import { csrfFetch } from "./csrf";

// * Action Types *************************
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_SPOT = "/spots/LOAD_SPOT";
const CREATE_SPOT = "spots/CREATE";

// * Action Creators **********************
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
});

// * Thunk Action Creators ****************
export const fetchSpots = () => async (dispatch) => {
  const response = await fetch("/api/spots");

  if (response.ok) {
    const spots = await response.json();
    dispatch(loadSpots(spots));
    return spots;
  } else {
    const errors = await response.json();
    return errors;
  }
};

export const fetchSpot = (spotId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpot(data));
      return data;
    } else {
      console.error("Failed to fetch spot:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching spot:", error);
  }
};

export const createNewSpot = (spotData) => async (dispatch, getState) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spotData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("========>Response from server:", response); //?? DEBUGGER

  if (response.ok) {
    const data = await response.json();
    const existingSpots = getState().spots.list; // Access the existing spots from the state
    dispatch(loadSpots([...existingSpots, data.spot])); // Update your existing spots here
    return data;
  } else {
    const errorData = await response.json();
    console.error("============>ERROR creating spot:", errorData);
    return Promise.reject(errorData);
  }
};

// * Reducers ***************************
const initialState = { entries: [], currentSpot: {} };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...action.spots };

    case LOAD_SPOT:
      return { ...state.entries, currentSpot: action.spot };

    case CREATE_SPOT:
      return {
        ...state,
        list: [...state, action.spot],
      };

    case "spots/LOAD_START":
      return {
        ...state,
        loading: true,
      };

    case "spots/LOAD_END":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default spotsReducer;
