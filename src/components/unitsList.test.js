import renderWithProvider from "../test-utilities/renderProvider";
import UnitsList from "./unitsList";
import userEvent from "@testing-library/user-event";

const mockState = {
  units: {
    filters: {
      age: { type: "age", value: "All" },
      Wood: { type: "cost", isChecked: false, value: 0 },
      Food: { type: "cost", isChecked: false, value: 0 },
      Gold: { type: "cost", isChecked: false, value: 0 },
    },
    isLoading: true,
    unitList: [
      {
        id: 1,
        name: "Archer",
        description:
          "Quick and light. Weak at close range; excels at battle from distance",
        expansion: "Age of Kings",
        age: "Feudal",
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 35,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 6,
        hit_points: 4,
        range: 30,
        attack: 4,
        armor: "0/0",
        accuracy: "80%",
      },
      {
        id: 2,
        name: "Crossbowman",
        description: "Upgraded archer",
        expansion: "Age of Kings",
        age: "Castle",
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 7,
        hit_points: 35,
        range: 5,
        attack: 5,
        armor: "0/0",
        attack_bonus: ["+3 spearmen"],
        accuracy: "85%",
      },
      {
        id: 3,
        name: "Arbalest",
        description: "Upgraded crossbowman",
        expansion: "Age of Kings",
        age: "Imperial",
        cost: {
          Wood: 25,
          Gold: 45,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 0.35,
        movement_rate: 0.96,
        line_of_sight: 7,
        hit_points: 40,
        range: 5,
        attack: 6,
        armor: "0/0",
        attack_bonus: ["+3 spearmen"],
        accuracy: "90%",
      },
      {
        id: 4,
        name: "Cavalry Archer",
        description: "Fast with ranged attack. Ideal for hit-and-run attacks",
        expansion: "Age of Kings",
        age: "Castle",
        cost: {
          Wood: 40,
          Gold: 70,
        },
        build_time: 34,
        reload_time: 2,
        attack_delay: 1,
        movement_rate: 1.4,
        line_of_sight: 5,
        hit_points: 50,
        range: 4,
        attack: 6,
        armor: "0/0",
        attack_bonus: ["+2 spearmen"],
        search_radius: 6,
        accuracy: "50%",
      },
      {
        id: 5,
        name: "Heavy Cavalry Archer",
        description: "Upgraded Cavalry Archer",
        expansion: "Age of Kings",
        age: "Imperial",
        cost: {
          Wood: 40,
          Gold: 70,
        },
        build_time: 27,
        reload_time: 2,
        attack_delay: 1,
        movement_rate: 1.4,
        line_of_sight: 6,
        hit_points: 60,
        range: 4,
        attack: 7,
        armor: "1/0",
        attack_bonus: ["+2 spearmen"],
        accuracy: "50%",
      },
    ],
  },
};

test("initial render with 5 elements", () => {
  const { getAllByTestId } = renderWithProvider(<UnitsList />, {
    preloadedState: mockState,
  });

  const list = getAllByTestId("list-element");

  expect(list.length).toEqual(5);
  expect(list[0].lastElementChild).not.toHaveTextContent(/food/i);
});

test("testing navigate on click", async () => {
  const mockHandler = jest.fn((str) => "I am heading to page " + str);
  const { getByText } = renderWithProvider(
    <UnitsList navigate={mockHandler} />,
    {
      preloadedState: mockState,
    }
  );
  const unit = getByText(/arbalest/i);

  await userEvent.click(unit);

  expect(mockHandler.mock.calls.length).toBe(1);
  expect(mockHandler.mock.results[0].value).toEqual(
    `I am heading to page /units/3`
  );
});
