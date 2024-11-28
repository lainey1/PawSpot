import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";

// * Action Types *************************
const SET_USER = "/session/SETUSER";
const REMOVE_USER = "/session/REMOVE_USER";

// * Action Creators **********************
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

// * Thunk Action Creators ****************
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;

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
};

export const logout = () => async (dispatch) => {
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
};

export const restoreUser = () => async (dispatch) => {
  // Send request to restore user session
  const response = await csrfFetch("/api/session");

  // Handle non-ok response
  if (!response.ok) {
    console.error("Failed to restore user session");
    return;
  }

  // ELSE dispatch setUser action
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;

  // IF ERROR
};

export const signup = (user) => async (dispatch) => {
  const { username, firstName, lastName, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      username,
      firstName,
      lastName,
      email,
      password,
    }),
  });

  // Hande non-ok response
  if (!response.ok) {
    console.error("Failed to sign up user");
    return;
  }

  // Parse response data and dispatch setUser action
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// * Reducers ***************************
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

// * Selectors **************************
// Basic selector to get session slice of state
const selectSession = (state) => state.session;

// Memoized selector to get user
export const selectSessionUser = createSelector(
  [selectSession],
  (session) => session.user
);
