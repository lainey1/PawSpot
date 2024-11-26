// import { ValidationError } from "../utils/validationError";

// * Action Types *************************
const LOAD_SPOTS = "/spots/load-spots";
const LOAD_SPOT = "/spots/load-spot";

// * Action Creators **********************
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpot = (spot) => ({
  type: LOAD_SPOTS,
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
    console.log(spot);
    return spot;
  } else {
    const errors = await response.json();

    console.log(errors);
    return;
  }
};
// * Reducers ***************************
const initialState = { entries: [] };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...action.spots };

    case LOAD_SPOT:
      return {
        ...action.spot,
      };

    default:
      return state;
  }
};

export default spotsReducer;
