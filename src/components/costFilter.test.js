import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import CostFilter from "../components/costFilter";
import renderWithProvider from "../test-utilities/renderProvider";

test("checking initial render", () => {
  renderWithProvider(<CostFilter />);

  expect(screen.getByText(/costs/i)).toBeInTheDocument();
});

test("All checkboxes are disabled on initial render", () => {
  renderWithProvider(<CostFilter />);

  expect(screen.getByLabelText(/wood/i).checked).toEqual(false);
  expect(screen.getByLabelText(/food/i).checked).toEqual(false);
  expect(screen.getByLabelText(/gold/i).checked).toEqual(false);
});
test("Sliders and filters becomes enabled after activating relevant checkbox", async () => {
  renderWithProvider(<CostFilter />);

  await userEvent.click(screen.getByLabelText("Wood"));
  await userEvent.click(screen.getByLabelText("Food"));
  await userEvent.click(screen.getByLabelText("Gold"));

  expect(screen.getByTestId(/woodrange/i)).toBeEnabled();
  expect(screen.getByTestId(/foodrange/i)).toBeEnabled();
  expect(screen.getByTestId(/goldrange/i)).toBeEnabled();

  expect(screen.getByLabelText("Wood")).toBeChecked();
  expect(screen.getByLabelText("Food")).toBeChecked();
  expect(screen.getByLabelText("Gold")).toBeChecked();
});

test("slider value changes on input", () => {
  renderWithProvider(<CostFilter />);

  fireEvent.change(screen.getByTestId(/woodrange/i), {
    target: { value: "0" },
  });
  fireEvent.change(screen.getByTestId(/foodrange/i), {
    target: { value: "100" },
  });
  fireEvent.change(screen.getByTestId(/goldrange/i), {
    target: { value: "200" },
  });
  expect(screen.getByTestId(/woodrange/i)).toHaveValue("0");
  expect(screen.getByTestId(/foodrange/i)).toHaveValue("100");
  expect(screen.getByTestId(/goldrange/i)).toHaveValue("200");
});
