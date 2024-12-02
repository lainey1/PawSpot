// * Thunk Action Creators **********
// Handles asynchronous logic using redux-thunk middleware to dispatch actions and access the current state (getState). Simplifies workflow, centralizes control, and improves scalability by separating concerns.

import { csrfFetch } from "../csrf";

import {
  loadImages,
  loadImage,
  createImage,
  updateImage,
  removeImage,
} from "./actions";

export const fetchImages = (spotId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/spots/${spotId}/images`);
    if (!response.ok) {
      throw new Error("Failed to fetch images");
    } else {
      const images = await response.json();
      dispatch(loadImages(images));
      return images;
    }
  } catch (error) {
    console.error("Error fetching images:", error.message);
  }
};

export const fetchImage = (imageId) => async (dispatch) => {
  const response = await fetch(`/api/images/${imageId}`);
  if (response.ok) {
    const image = await response.json();
    dispatch(loadImage(image));
  }
};

export const addImagesToSpot = (spotId, imageUrls) => async (dispatch) => {
  for (const url of imageUrls) {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    });

    console.log("RESPONSE ==> ", response);

    if (!response.ok) throw response;
    if (response.ok) {
      const newImage = await response.json();
      console.log("newIMAGE ==> ", newImage);
      dispatch(createImage(newImage));
    }
  }
};

export const editImage = (imageId, updatedData) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "PUT",
    body: JSON.stringify(updatedData),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    const updatedImage = await response.json();
    dispatch(updateImage(updatedImage));
    return updatedImage.id;
  }
};

export const deleteReview = (imageId) => async (dispatch) => {
  const response = await csrfFetch(`/api/images/${imageId}`, {
    method: "DELETE",
  });
  console.log("RESPONSE ===> ", response);
  if (response.ok) {
    dispatch(removeImage(imageId));
  }
};
