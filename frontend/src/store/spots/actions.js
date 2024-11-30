//* Action Creators **********
// Encapsulate the creation of action objects (POJOs) to describe events or changes in app state. Improves consistency and supports scalability as Redux app grows.
import {
  LOAD_SPOTS,
  LOAD_SPOT,
  CREATE_SPOT,
  UPDATE_SPOT,
  DELETE_SPOT,
} from "./types";

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots,
});

export const loadSpot = (spot) => ({
  type: LOAD_SPOT,
  spot,
});

export const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

export const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot,
});

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});
