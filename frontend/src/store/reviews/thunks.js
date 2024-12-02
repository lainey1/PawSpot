// * Thunk Action Creators **********
// Handles asynchronous logic using redux-thunk middleware to dispatch actions and access the current state (getState). Simplifies workflow, centralizes control, and improves scalability by separating concerns.

import { csrfFetch } from "../csrf";

import {
  loadReviews,
  loadReview,
  createReview,
  updateReview,
  removeReview,
} from "./actions";

export const fetchReviews = (spotId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = await response.json();
    console.log(reviews);
    dispatch(loadReviews(reviews));
  } catch (error) {
    console.error("Error fetching reviews:", error.message);
  }
};

export const fetchReview = (reviewId) => async (dispatch) => {
  const response = await fetch(`/api/reviews/${reviewId}`);
  if (response.ok) {
    const review = await response.json();
    dispatch(loadReview(review));
  }
};

export const createNewReview = (reviewData) => async (dispatch) => {
  try {
    const response = await csrfFetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(reviewData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const newReview = await response.json();
      dispatch(createReview(newReview));
      return newReview.id;
    } else {
      const errorData = await response.json();
      return Promise.reject(errorData);
    }
  } catch (error) {
    console.error("Error creating review:", error);
    return Promise.reject(error);
  }
};

export const editReview = (reviewId, updatedData) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const updatedReview = await response.json();
    dispatch(updateReview(updatedReview));
    return updatedReview.id;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  console.log("RESPONSE ===> ", response);
  if (response.ok) {
    dispatch(removeReview(reviewId));
  }
};
