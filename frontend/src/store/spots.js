// frontend/src/store/spots.js

// * Action Types *************************
const LOAD_SPOTS = "/spots/load";

// * Action Creators **********************
export const loadSpots = (list) => ({
  type: LOAD_SPOTS,
  list,
});

// * Thunk Action Creators ****************
export const getSpots = () => async (dispatch) => {
  dispatch({ type: "spots/LOAD_START" }); // Set loading true before fetch
  try {
    const response = await fetch(`api/spots`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadSpots(data.Spots));
      return data.spot;
    } else {
      console.error("Failed to fetch spots:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching spots:", error);
  }
};

// * Reducers ***************************
const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return {
        ...state,
        ...action.list,
      };

    default:
      return state;
  }
};

export default spotsReducer;
