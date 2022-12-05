import userEvent from "@testing-library/user-event";
import AgesFilter from "../components/agesFilter";
import renderWithProvider from "../test-utilities/renderProvider";

test("checking initial render", () => {
  const { getByText } = renderWithProvider(<AgesFilter />);
  const heading = getByText(/ages/i);
  expect(heading).toBeInTheDocument();
});
test("All is checked on initial render", () => {
  const { getByTestId } = renderWithProvider(<AgesFilter />);
  const all = getByTestId("All");

  expect(all).toHaveClass("active");
});

test("Checked option changes on click", async () => {
  const { getByTestId } = renderWithProvider(<AgesFilter />);
  const all = getByTestId("All");
  const dark = getByTestId("Dark");
  const feudal = getByTestId("Feudal");
  const castle = getByTestId("Castle");
  const imperial = getByTestId("Imperial");

  await userEvent.click(dark);
  expect(all).not.toHaveClass("active");
  expect(dark).toHaveClass("active");
  expect(feudal).not.toHaveClass("active");
  expect(castle).not.toHaveClass("active");
  expect(imperial).not.toHaveClass("active");
});
