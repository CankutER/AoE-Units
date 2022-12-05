import { rest } from "msw";
import { setupServer } from "msw/node";
import userEvent from "@testing-library/user-event";
import Units from "./units";
import renderWithProvider from "../test-utilities/renderProvider";
import mockList from "../test-utilities/mockList.json";
import { BrowserRouter } from "react-router-dom";
import { setupStore } from "../test-utilities/setupStoreForSaga";
import { fireEvent } from "@testing-library/react";
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
  const { getByTestId, queryAllByTestId, findAllByTestId } = renderWithProvider(
    <BrowserRouter>
      <Units />
    </BrowserRouter>,
    { store: setupStore() }
  );
  const darkAgeBtn = getByTestId("Dark");
  await userEvent.click(darkAgeBtn);
  const unitsListBefore = queryAllByTestId("list-element");
  expect(unitsListBefore.length).toBeFalsy();
  const unitsListAfter = await findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
test("testing network requests on cost checkbox changes", async () => {
  const { getByLabelText, queryAllByTestId, findAllByTestId } =
    renderWithProvider(
      <BrowserRouter>
        <Units />
      </BrowserRouter>,
      { store: setupStore() }
    );
  const woodCheck = getByLabelText(/wood/i);
  await userEvent.click(woodCheck);
  const unitsListBefore = queryAllByTestId("list-element");
  expect(unitsListBefore.length).toBeFalsy();
  const unitsListAfter = await findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
test("testing network requests on cost slider changes", async () => {
  const { queryAllByTestId, findAllByTestId, getByTestId } = renderWithProvider(
    <BrowserRouter>
      <Units />
    </BrowserRouter>,
    { store: setupStore() }
  );
  const woodSlider = getByTestId(/woodrange/i);
  fireEvent.change(woodSlider, { target: { value: "50" } });
  const unitsListBefore = queryAllByTestId("list-element");
  expect(unitsListBefore.length).toBeFalsy();
  const unitsListAfter = await findAllByTestId("list-element");
  expect(unitsListAfter.length).toBe(3);
});
