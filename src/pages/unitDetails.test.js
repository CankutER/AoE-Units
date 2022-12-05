import mockList from "../test-utilities/mockList.json";
import renderWithProvider from "../test-utilities/renderProvider";
import UnitDetails from "./unitDetails";
import { screen, waitFor } from "@testing-library/react";
import { setupStore } from "../test-utilities/setupStoreForSaga";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Route, Routes, MemoryRouter } from "react-router-dom";
const url = "/age-of-empires-units.json";

const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockList));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());
afterAll(() => {
  server.close();
});

test("fetching relevant unit and displaying on initial render", async () => {
  const { getByText, findByText, store, queryByText } = renderWithProvider(
    <MemoryRouter initialEntries={["/units/1"]}>
      <Routes>
        <Route path="/units/:unitId" element={<UnitDetails />}></Route>
      </Routes>
    </MemoryRouter>,
    {
      store: setupStore(),
    }
  );

  const unitNameBefore = queryByText(/archer/i);
  expect(unitNameBefore).not.toBeInTheDocument();

  const unitNameAfter = await findByText(/archer/i);

  await waitFor(() => expect(store.getState().details.unit.id).toBeTruthy());
  expect(unitNameAfter).toBeInTheDocument();
});
