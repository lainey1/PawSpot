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
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });

  console.log("Response:", response); // Log the response to check its status
  if (response.ok) {
    const data = await response.json();
    console.log("User data:", data.user); // Log the user data
    dispatch(setUser(data.user));
    return response;
  } else {
    const data = await response.json();
    console.error("Error during login:", data); // Log any errors
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
    dispatch(setUser(data.user));
    return response;
  } else {
    const data = await response.json();
    console.error("Signup Error:", data); // Log any errors for better debugging
    return Promise.reject(data);
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
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
const initialState = { user: null };

// Session Reducer
const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    default:
      return state;
  }
};

export default sessionReducer;
