import { useSelector } from "react-redux";

const UnitsList = ({ navigate }) => {
  const unitsState = useSelector((state) => state.units);

  return (
    <section className="unit-list">
      <table className="custom-table table table-bordered table-responsive ">
        <thead className="table-headings">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Costs</th>
          </tr>
        </thead>
        <tbody>
          {unitsState.unitList.map((unit, i) => {
            return (
              <tr
                key={unit.id}
                data-testid="list-element"
                className="single-unit"
                onClick={() => {
                  navigate(`/units/${unit.id}`);
                }}
              >
                <td>{unit.id || "-"}</td>
                <td>{unit.name || "-"}</td>
                <td>{unit.age || "-"}</td>
                <td>
                  {unit.cost
                    ? Object.keys(unit.cost).map((key, i) => {
                        if (!unit.cost[key]) {
                          return null;
                        }
                        const nextItem =
                          unit.cost[Object.keys(unit.cost)[i + 1]];
                        if (!nextItem) {
                          return `${key}: ${unit.cost[key]}`;
                        }
                        return `${key}: ${unit.cost[key]}, `;
                      })
                    : "No cost"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default UnitsList;
