//* Action Types *************************
const FETCH_REVIEWS = "reviews/FETCH_REVIEWS";

//* Action Creators **********************
export const fetchReviewsAction = (reviews) => ({
  type: FETCH_REVIEWS,
  payload: reviews,
});

//* Selector
export const selectReviews = (state) => Object.values(state.reviews);

// * Thunk Action Creators ****************
export const fetchReviews = (spotId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    dispatch(fetchReviewsAction(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
  }
};

// * Initial State **********************
const initialState = {};

// * Reducers ***************************
const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REVIEWS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reviewsReducer;
