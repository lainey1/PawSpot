// * Action Types *************************
const LOAD_SPOTS = "/spots/load-spots";
const LOAD_SPOT = "/spots/load-spot";

// * Action Creators **********************
const loadSpots = (list) => ({
  type: LOAD_SPOTS,
  list,
});
const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
});

// * Thunk Action Creators ****************
export const getSpots = () => async (dispatch) => {
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

// * Reducers ***************************
const initialState = {
  spots: {},
  currentSpot: null,
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsById = {};
      action.list.forEach((spot) => {
        spotsById[spot.id] = spot;
      });
      return {
        ...state,
        spots: spotsById,
      };
    }

    case LOAD_SPOT: {
      return {
        ...state,
        spots: {
          ...state.spots,
          [action.spot.id]: action.spot,
        },
        currentSpot: action.spot,
      };
    }

    default:
      return state;
  }
};

export default spotsReducer;
