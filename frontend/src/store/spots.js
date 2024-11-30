import { csrfFetch } from "./csrf";

// * Action Types *************************
const LOAD_SPOTS = "/spots/LOAD_SPOTS";
const LOAD_SPOT = "/spots/LOAD_SPOT";
const CREATE_SPOT = "/spots/CREATE";
const UPDATE_SPOT = "/spots/UPDATE";

// * Action Creators **********************
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
});

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
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

export const createNewSpot = (spotData) => async (dispatch) => {
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    body: JSON.stringify(spotData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const newSpot = await response.json();
    dispatch(createSpot(newSpot));
    return newSpot.id;
  } else {
    const errorData = await response.json();
    return Promise.reject(errorData);
  }
};

export const editSpot = (spotId, updatedData) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      const updatedSpot = await response.json();
      dispatch(updateSpot(updatedSpot));
      return updatedSpot;
    } else {
      const errors = await response.json();
      return Promise.reject(errors);
    }
  } catch (error) {
    console.error("Error updating spot:", error);
    return Promise.reject(error);
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
      return { ...state.entries, currentSpot: action.spot };

    case UPDATE_SPOT:
      return {
        ...state,
        entries: Array.isArray(state.entries)
          ? state.entries.map((spot) =>
              spot.id === action.spot.id ? action.spot : spot
            )
          : [],
        currentSpot:
          action.spot.id === state.currentSpot.id
            ? action.spot
            : state.currentSpot,
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
