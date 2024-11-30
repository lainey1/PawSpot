import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots/reducer";
import reviewsReducer from "./reviews";

// * 1 Create Root Reducer *********
// Makes Redux applications scalable as the state grows in complexity.
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
});

// * 2 Enhancer ********************
let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

// * 3 Configure the store  **********
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

//# If we were using redux toolkit, we simply code with below:
// import { configureStore } from "@reduxjs/toolkit";
// import spotsReducer from "./spots/reducer";

// const store = configureStore({
//   reducer: {
//     spots: spotsReducer,
//   },
// });

// export default store;
