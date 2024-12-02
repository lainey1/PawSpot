//* Action Creators **********
// Encapsulate the creation of action objects (POJOs) to describe events or changes in app state. Improves consistency and supports scalability as Redux app grows.
import {
  LOAD_REVIEWS,
  LOAD_REVIEW,
  CREATE_REVIEW,
  UPDATE_REVIEW,
  DELETE_REVIEW,
} from "./types";

export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
});

export const loadReview = (review) => ({
  type: LOAD_REVIEW,
  review,
});

export const createReview = (review) => ({
  type: CREATE_REVIEW,
  review,
});

export const updateReview = (review) => ({
  type: UPDATE_REVIEW,
  review,
});

export const removeReview = (spotId) => ({
  type: DELETE_REVIEW,
  spotId,
});
