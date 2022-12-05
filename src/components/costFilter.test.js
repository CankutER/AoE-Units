import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CostFilter from "../components/costFilter";
import renderWithProvider from "../test-utilities/renderProvider";

test("checking initial render", () => {
  const { getByText } = renderWithProvider(<CostFilter />);
  const heading = getByText(/costs/i);
  expect(heading).toBeInTheDocument;
});

test("All checkboxes are disabled on initial render", () => {
  const { getByLabelText } = renderWithProvider(<CostFilter />);
  const wood = getByLabelText(/wood/i);
  const food = getByLabelText(/food/i);
  const gold = getByLabelText(/gold/i);
  expect(wood.checked).toEqual(false);
  expect(food.checked).toEqual(false);
  expect(gold.checked).toEqual(false);
});
test("Sliders and filters becomes enabled after activating relevant checkbox", async () => {
  const { getByText, getByTestId, getByLabelText } = renderWithProvider(
    <CostFilter />
  );

  const woodCheck = getByLabelText("Wood");
  const foodCheck = getByLabelText("Food");
  const goldCheck = getByLabelText("Gold");
  const woodRange = getByTestId(/woodrange/i);
  const foodRange = getByTestId(/foodrange/i);
  const goldRange = getByTestId(/goldrange/i);
  await userEvent.click(getByLabelText("Wood"));
  await userEvent.click(getByLabelText("Food"));
  await userEvent.click(getByLabelText("Gold"));

  expect(woodRange).toBeEnabled();
  expect(foodRange).toBeEnabled();
  expect(goldRange).toBeEnabled();

  expect(woodCheck).toBeChecked();
  expect(foodCheck).toBeChecked();
  expect(goldCheck).toBeChecked();
});

test("slider value changes on input", () => {
  const { getByTestId } = renderWithProvider(<CostFilter />);
  const woodRange = getByTestId(/woodrange/i);
  const foodRange = getByTestId(/foodrange/i);
  const goldRange = getByTestId(/goldrange/i);
  fireEvent.change(woodRange, { target: { value: "0" } });
  fireEvent.change(foodRange, { target: { value: "100" } });
  fireEvent.change(goldRange, { target: { value: "200" } });
  expect(woodRange).toHaveValue("0");
  expect(foodRange).toHaveValue("100");
  expect(goldRange).toHaveValue("200");
});
