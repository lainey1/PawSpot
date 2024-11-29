import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import spotsReducer from "./spots";
import reviewsReducer from "./reviews";

// * 1 Create Root Reducer *********
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
