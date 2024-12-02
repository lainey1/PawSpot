//* Action Creators **********
// Encapsulate the creation of action objects (POJOs) to describe events or changes in app state. Improves consistency and supports scalability as Redux app grows.
import {
  LOAD_IMAGES,
  LOAD_IMAGE,
  CREATE_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
} from "./types";

export const loadImages = (images) => ({
  type: LOAD_IMAGES,
  images,
});

export const loadImage = (image) => ({
  type: LOAD_IMAGE,
  image,
});

export const createImage = (image) => ({
  type: CREATE_IMAGE,
  image,
});

export const updateImage = (image) => ({
  type: UPDATE_IMAGE,
  image,
});

export const removeImage = (imageId) => ({
  type: DELETE_IMAGE,
  imageId,
});
