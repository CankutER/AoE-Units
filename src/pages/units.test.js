import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import Units from "./units";
import renderWithProvider from "../test-utilities/renderProvider";
import mockList from "../test-utilities/mockList.json";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "../test-utilities/setupStoreForSaga";
import { fireEvent } from "@testing-library/react";
import { screen } from "@testing-library/react";
const url = "/age-of-empires-units.json";

const handlers = [
  rest.get(url, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockList));
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
test("testing network requests on form changes", async () => {
  renderWithProvider(
    <BrowserRouter>
      <Units />
    </BrowserRouter>,
    { store: setupStore() }
  );

  await userEvent.click(screen.getByTestId("Dark"));

  expect(screen.queryAllByTestId("list-element").length).toBeFalsy();
  const unitsListAfter = await screen.findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
test("testing network requests on cost checkbox changes", async () => {
  renderWithProvider(
    <BrowserRouter>
      <Units />
    </BrowserRouter>,
    { store: setupStore() }
  );

  await userEvent.click(screen.getByLabelText(/wood/i));

  expect(screen.queryAllByTestId("list-element").length).toBeFalsy();
  const unitsListAfter = await screen.findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
test("testing network requests on cost slider changes", async () => {
  renderWithProvider(
    <BrowserRouter>
      <Units />
    </BrowserRouter>,
    { store: setupStore() }
  );

  fireEvent.change(screen.getByTestId(/woodrange/i), {
    target: { value: "50" },
  });

  expect(screen.queryAllByTestId("list-element").length).toBeFalsy();
  const unitsListAfter = await screen.findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
