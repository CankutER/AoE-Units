import { useDispatch, useSelector } from "react-redux";
import { ages, costTypes } from "../utilities/filters";
import {
  setAge,
  setValue,
  setChecked,
  setUnitList,
} from "../features/unitsSlice";
import { useEffect } from "react";
import filterGenerator from "../utilities/filterGenerator";

const url = "/age-of-empires-units.json";
const Units = () => {
  const unitsState = useSelector((state) => state.units);
  const dispatch = useDispatch();

  const fetchUnits = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
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
      });
      return acc;
    }, units);
    //
    dispatch(setUnitList(filteredUnits));
  };

  useEffect(() => {
    fetchUnits();
  }, [unitsState]);
  return (
    <article className="content">
      <form className="filter-form">
        {/* AGES */}
        <section className="form-group ages">
          <h3>Ages</h3>
          {ages.map((age, i) => {
            return (
              <div key={i}>
                <div className="ages-group">
                  <input
                    type="radio"
                    name="age"
                    defaultChecked={i === 0 ? true : false}
                    value={age}
                    id={`age-${i}`}
                    onClick={(e) => dispatch(setAge(e.target.value))}
                  />
                  <label htmlFor={`age-${i}`}>{age}</label>
                </div>
              </div>
            );
          })}
        </section>
        {/*  */}
        {/* COST FILTERS */}
        <section className="form-group costs">
          <h3>Costs</h3>
          {costTypes.map((type, i) => {
            return (
              <div className="cost-group" key={i}>
                <div className="single-cost">
                  <div className="cost-control">
                    <input
                      type="checkbox"
                      onClick={() => dispatch(setChecked(type))}
                      name={type}
                      id={`${type}Check`}
                    />
                    <label htmlFor={`${type}Check`}>{type}</label>
                  </div>
                  <div className="cost-control">
                    <input
                      type="range"
                      min={0}
                      max={200}
                      value={unitsState.filters[type].value}
                      disabled={!unitsState.filters[type].isChecked}
                      onChange={(e) =>
                        dispatch(setValue({ type, value: e.target.value }))
                      }
                      name={`${type}Range`}
                      id={`${type}Range`}
                    />
                    <label htmlFor={`${type}Range`}>
                      0 - {unitsState.filters[type].value}
                    </label>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
        {/*  */}
      </form>
      <section className="unit-list">
        {unitsState.unitList.map((unit, i) => {
          return (
            <p key={unit.id}>
              ID:{unit.id} Name:{unit.name} Gold:{unit?.cost?.Gold} Wood:
              {unit?.cost?.Wood} Food:{unit?.cost?.Food}
            </p>
          );
        })}
      </section>
    </article>
  );
};
export default Units;
