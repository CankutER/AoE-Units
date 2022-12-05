import SharedLayout from "./shared";

import renderWithProvider from "../test-utilities/renderProvider";
import { MemoryRouter } from "react-router-dom";
import { setupStore } from "../test-utilities/setupStoreForSaga";
test("checking page title based on route", async () => {
  const { getByTestId } = renderWithProvider(
    <MemoryRouter initialEntries={["/units/1"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );
  const title = getByTestId("title");
  expect(title).toHaveTextContent(/details page/i);
});
test("checking page title based on route 2", async () => {
  const { getByTestId } = renderWithProvider(
    <MemoryRouter initialEntries={["/"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );
  const title = getByTestId("title");
  expect(title).toHaveTextContent(/home page/i);
});
test("checking page title based on route 3", async () => {
  const { getByTestId } = renderWithProvider(
    <MemoryRouter initialEntries={["/units"]}>
      <SharedLayout />
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );
  const title = getByTestId("title");
  expect(title).toHaveTextContent(/units page/i);
});
