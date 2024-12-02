// * Reducers **********
// Handle state updates based on dispatch actions. Pure functions taking current state and action as inputs to return a new state

import {
  LOAD_IMAGES,
  LOAD_IMAGE,
  CREATE_IMAGE,
  UPDATE_IMAGE,
  DELETE_IMAGE,
} from "./types";

const initialState = { currentImages: {} };

const imagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_IMAGES:
      return { ...state, ...action.images };

    case LOAD_IMAGE:
      return { ...state, currentSpot: action.image };

    case CREATE_IMAGE:
      return { ...state, ...action.image };

    case UPDATE_IMAGE: {
      return {
        ...state,
        images: state.images
          ? state.images.map((image) =>
              image.id === action.image.id ? action.image : image
            )
          : [],
      };
    }

    case DELETE_IMAGE:
      return {
        ...state,
        images: state.images
          ? state.images.filter((image) => image.id !== action.imageId)
          : [],
      };

    default:
      return state;
  }
};

export default imagesReducer;
