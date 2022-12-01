import { configureStore } from "@reduxjs/toolkit";
import unitsReducer from "./features/unitsSlice";
import detailsReducer from "./features/detailsSlice";
import createSagaMiddleware from "@redux-saga/core";
import fetchWatcher from "./features/unitsSaga";
import { unitWatcher } from "./features/detailsSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { units: unitsReducer, details: detailsReducer },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(fetchWatcher);
sagaMiddleware.run(unitWatcher);
export default store;
