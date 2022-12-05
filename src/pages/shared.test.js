import SharedLayout from "./shared";
import { screen } from "@testing-library/react";
import renderWithProvider from "../test-utilities/renderProvider";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "../test-utilities/setupStoreForSaga";
test("checking page title based on route", async () => {
  renderWithProvider(
    <MemoryRouter initialEntries={["/units/1"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );

  expect(screen.getByTestId("title")).toHaveTextContent(/details page/i);
});
test("checking page title based on route 2", async () => {
  renderWithProvider(
    <MemoryRouter initialEntries={["/"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );

  expect(screen.getByTestId("title")).toHaveTextContent(/home page/i);
});
test("checking page title based on route 3", async () => {
  renderWithProvider(
    <MemoryRouter initialEntries={["/units"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );

  expect(screen.getByTestId("title")).toHaveTextContent(/units page/i);
});
