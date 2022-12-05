import userEvent from "@testing-library/user-event";
import AgesFilter from "../components/agesFilter";
import renderWithProvider from "../test-utilities/renderProvider";
import { screen } from "@testing-library/react";

test("checking initial render", () => {
  renderWithProvider(<AgesFilter />);

  expect(screen.getByText(/ages/i)).toBeInTheDocument();
});
test("All is checked on initial render", () => {
  renderWithProvider(<AgesFilter />);

  expect(screen.getByTestId("All")).toHaveClass("active");
});

test("Checked option changes on click", async () => {
  renderWithProvider(<AgesFilter />);

  await userEvent.click(screen.getByTestId("Dark"));
  expect(screen.getByTestId("All")).not.toHaveClass("active");
  expect(screen.getByTestId("Dark")).toHaveClass("active");
  expect(screen.getByTestId("Feudal")).not.toHaveClass("active");
  expect(screen.getByTestId("Castle")).not.toHaveClass("active");
  expect(screen.getByTestId("Imperial")).not.toHaveClass("active");
});
