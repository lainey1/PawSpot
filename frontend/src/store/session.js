// frontend/src/store/session.js

import { csrfFetch } from "./csrf";

// Action Types
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// Initial State
const initialState = {
  user: null,
};

// Action Creators
export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const removeUser = () => ({
  type: REMOVE_USER,
});

// Thunk Action Creator for Login
export const login = (credential, password) => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({ credential, password }),
  });

  if (response.ok) {
    const user = await response.json();
    dispatch(setUser(user));
    return user; // Optional: Return user data if needed
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
  }
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// Session Reducer
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
