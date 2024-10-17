//frontend/src/store/spots.js

// #1 ACTION TYPES
const LOAD = "spots/LOAD";

// #2 ACTION CREATORS
//* Create Action with LOAD type that returns action type and list of spots:
export const loadSpots = (spotsData) => ({
  type: LOAD,
  list: spotsData, // Pass the data in the expected structure
});

// #3 THUNK ACTION
//* Create thunk action to fetch list of Spots from the server
export const getSpots = () => async (dispatch) => {
  try {
    const response = await fetch(`api/spots`);
    if (response.ok) {
      const data = await response.json(); // Converts response to JSON
      dispatch(loadSpots(data));
    } else {
      console.error("Failed to fetch spots:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching spots:", error);
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
        loading: false, // Consider setting loading here if needed
        list: action.list,
      };
    default:
      return state;
  }
};

export default spotsReducer;
