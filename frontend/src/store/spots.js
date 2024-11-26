// * Action Types *************************
const LOAD_SPOTS = "/spots/load-spots";
const LOAD_SPOT = "/spots/load-spot";

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
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(loadSpot(spot));
    return spot;
  } else {
    const errors = await response.json();
    return errors;
  }
};
// * Reducers ***************************
const initialState = { entries: [], singleSpot: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...action.spots };

    case LOAD_SPOT:
      return { ...state, singleSpot: action.spot };

    default:
      return state;
  }
};

export default spotsReducer;
