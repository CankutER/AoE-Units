import renderWithProvider from "../test-utilities/renderProvider";
import Landing from "./landing";

test("testing initial render of landing", () => {
  const { getByTestId } = renderWithProvider(<Landing />);
  const landing = getByTestId("landing");
  expect(landing).toBeInTheDocument();
});
