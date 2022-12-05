import renderWithProvider from "../test-utilities/renderProvider";
import Landing from "./landing";
import { screen } from "@testing-library/react";
test("testing initial render of landing", () => {
  renderWithProvider(<Landing />);

  expect(screen.getByTestId("landing")).toBeInTheDocument();
});
