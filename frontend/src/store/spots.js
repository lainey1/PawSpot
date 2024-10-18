//frontend/src/store/spots.js

import { csrfFetch } from "./csrf";

// #1 ACTION TYPES
const LOAD = "spots/LOAD";
const CREATE = "spots/CREATE";

// #2 ACTION CREATORS
//* Create Action with LOAD type that returns action type and list of spots:
export const loadSpots = (spotsData) => ({
  type: LOAD,
  list: spotsData, // Pass the data in the expected structure
});

//* Create Action to add created spot to the store

export const createSpot = (spotsData) => ({
  type: LOAD,
  list: spotsData,
});

// #3 THUNK ACTION
//* Create thunk action to fetch list of Spots from the server
export const getSpots = () => async (dispatch) => {
  dispatch({ type: "spots/LOAD_START" }); // Set loading true before fetch
  try {
    const response = await fetch(`api/spots`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpots(data.Spots)); //! FIX IDENTIFIED. Updated from data to data.spots to access nested data.
    } else {
      console.error("Failed to fetch spots:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching spots:", error);
  } finally {
    dispatch({ type: "spots/LOAD_END" }); // Set loading false after fetch
  }
};

//* Create thunk actio to to add spot to the server
export const createNewSpot = (spotData) => async (dispatch, getState) => {
  const state = getState();
  const token = state.session.user?.token;
  console.log(state.session.user);
  console.log("User Token:", token);

  if (!token) {
    throw new Error("User not authenticated");
  }

  try {
    const response = await csrfFetch("/api/spots", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Use the retrieved token
      },
      body: JSON.stringify(spotData),
    });

    if (response.ok) {
      const newSpot = await response.json();
      dispatch(createSpot(newSpot));
      return newSpot;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create spot");
    }
  } catch (error) {
    console.error("Failed to create spot:", error);
    throw error;
  }
};

//* Initial State
const initialState = {
  list: [],
  loading: false,
};

// #4 REDUCER HANDLING
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    //* When LOAD action type is received, it processes the list of Spots from the action.
    case LOAD:
      return {
        ...state,
        loading: false,
        list: action.list,
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
    case CREATE:
      return {
        ...state,
        list: [...state.list, action.spot], // Add the new spot to the list
      };
    default:
      return state;
  }
};

export default spotsReducer;
