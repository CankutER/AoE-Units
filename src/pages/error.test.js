import ErrorPage from "./error";
import { screen } from "@testing-library/react";
import renderWithProvider from "../test-utilities/renderProvider";
import { MemoryRouter } from "react-router-dom";

test("it renders error correctly", () => {
  renderWithProvider(
    <MemoryRouter initialEntries={["/randomRoute"]}>
      <ErrorPage />
    </MemoryRouter>
  );

  expect(screen.getByText(/this is not a valid page/i)).toBeInTheDocument();
});
