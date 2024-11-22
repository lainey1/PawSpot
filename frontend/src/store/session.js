// frontend/src/store/session.js
import { csrfFetch } from "./csrf";

// ***************************************************
// * Action Types
// ***************************************************
const SET_USER = "/session/setUser";
const REMOVE_USER = "/session/removeUser";

// ***************************************************
// * Action Creator
// ***************************************************
const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

// ***************************************************
// * Thunk Action Creator
// ***************************************************

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;

  try {
    // Make a POST request to the login endpoint
    const response = await csrfFetch("/api/session", {
      method: "POST",
      body: JSON.stringify({
        credential,
        password,
      }),
    });

    // Handle non-ok response
    if (!response.ok) {
      console.error("Failed to log in user");
      return;
    }

    // Parse response data and dispatch setUser action
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;

    // Catch any errors (e.g. network issues)
  } catch (error) {
    console.error("LOGIN ACTION FAILED: ", error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    // Send a DELETE request to log the user out
    const response = await csrfFetch("/api/session", {
      method: "DELETE",
    });

    // Handle non-ok response
    if (!response.ok) {
      console.error("Failed to log out user");
      return;
    }

    // Dispatch the removeUser action
    dispatch(removeUser());
    return response;

    // IF ERROR
  } catch (error) {
    // Log unexpected errors for debugging
    console.error("LOGOUT ACTION FAILED ", error);
  }
};

// ***************************************************
// * Reducer
// ***************************************************

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
