import filterGenerator from "./filterGenerator";
const fetchAndFilter = async ({ url, unitsState }) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  if (!response.ok) {
    throw "Failed to get data";
  }
  const data = await response.json();
  const units = data.units;
  // filter logic
  const filterStore = filterGenerator(unitsState.filters);

  const filteredUnits = filterStore.reduce((acc, currFilter) => {
    acc = acc.filter((unit) => {
      if (currFilter.type === "age") {
        if (currFilter.value !== "All") {
          return unit.age === currFilter.value;
        }
        return true;
      }
      if (currFilter.type === "cost") {
        if (currFilter.isChecked) {
          return (
            !unit.cost ||
            !unit.cost[currFilter.name] ||
            unit.cost[currFilter.name] <= currFilter.value
          );
        }
        return true;
      }
      return true;
    });
    return acc;
  }, units);
  return filteredUnits;
};

export default fetchAndFilter;
