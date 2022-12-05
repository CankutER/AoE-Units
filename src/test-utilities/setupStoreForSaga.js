import { combineReducers, configureStore } from "@reduxjs/toolkit";
import unitsReducer from "../features/unitsSlice";
import detailsReducer from "../features/detailsSlice";
import createSagaMiddleware from "@redux-saga/core";
import fetchWatcher from "../features/unitsSaga";
import { unitWatcher } from "../features/detailsSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  units: unitsReducer,
  details: detailsReducer,
});

export const setupStore = (preloadedState = {}) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: [sagaMiddleware],
  });
  sagaMiddleware.run(fetchWatcher);
  sagaMiddleware.run(unitWatcher);
  return store;
};
