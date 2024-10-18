// frontend/src/store/session.js

import { csrfFetch } from "./csrf";

// Action Types
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunk Action Creator for Login
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  console.log("Logging in with:", { credential, password }); // Log credentials
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });
  console.log("Response status:", response.status); // Log the response status
  if (response.ok) {
    const data = await response.json();
    console.error("Login error:", data); // Log error details
    dispatch(setUser(data.user));
    return response;
  } else {
    const data = await response.json();
    return Promise.reject(data);
  }
};
// Thunk Action Creator for Sign Up
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

  if (response.ok) {
    const data = await response.json();
    console.log("LOOKING FOR TOKEN ====> Login Response:", data); // Check if the token is here
    dispatch(setUser(data.user));

    return response;
  } else {
    const data = await response.json();
    return Promise.reject(data);
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  if (response.ok) {
    const data = await response.json();
    console.log("Restored user:", data.user); // Log to check user data
    dispatch(setUser(data.user));
  } else {
    console.error("Failed to restore user:", response.status);
  }
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

// Initial State
const initialState = {
  user: null,
  isLoaded: false,
};

// Session Reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload, isLoaded: true };
    case REMOVE_USER:
      return { ...state, user: null, isLoaded: true };
    default:
      return state;
  }
};

export default sessionReducer;
