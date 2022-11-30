import { configureStore } from "@reduxjs/toolkit";
import unitsReducer from "./features/unitsSlice";

const store = configureStore({
  reducer: { units: unitsReducer },
});

export default store;
