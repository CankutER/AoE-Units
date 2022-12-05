import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import unitsReducer from "../features/unitsSlice";
import detailsReducer from "../features/detailsSlice";
import { Provider } from "react-redux";

const renderWithProvider = (
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { units: unitsReducer, details: detailsReducer },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) => {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export default renderWithProvider;
