// * Reducers **********
// Handle state updates based on dispatch actions. Pure functions taking current state and action as inputs to return a new state

import {
  LOAD_REVIEWS,
  LOAD_REVIEW,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "./types";

const initialState = { currentReview: {} };

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      return { ...state, ...action.reviews };

    case LOAD_REVIEW:
      return { ...state, currentSpot: action.review };

    case CREATE_REVIEW:
      return { ...state, ...action.review };

    case UPDATE_REVIEW: {
      return {
        ...state,
        reviews: state.reviews
          ? state.reviews.map((review) =>
              review.id === action.review.id ? action.review : review
            )
          : [],
      };
    }

    case DELETE_REVIEW:
      return {
        ...state,
        reviews: state.reviews
          ? state.reviews.filter((review) => review.id !== action.reviewId)
          : [],
      };

    default:
      return state;
  }
};

export default reviewsReducer;
