import { useDispatch, useSelector } from "react-redux";
import { ages, costTypes } from "../utilities/filters";
import {
  setAge,
  setValue,
  setChecked,
  requestFetch,
} from "../features/unitsSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Units = () => {
  const unitsState = useSelector((state) => state.units);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Including requestFetch to create a single point of entry for saga as there are multiple inputs triggering state change, goal is to prevent race conditions
  const dispatchWithFetch = (action) => {
    dispatch(action);
    dispatch(requestFetch());
  };
  //
  useEffect(() => {
    dispatch(requestFetch());
  }, []);
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
                    checked={age === unitsState.filters.age.value}
                    value={age}
                    id={`age-${i}`}
                    onChange={(e) => {
                      dispatchWithFetch(setAge(e.target.value));
                    }}
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
                      checked={unitsState.filters[type].isChecked}
                      onClick={() => dispatchWithFetch(setChecked(type))}
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
                        dispatchWithFetch(
                          setValue({ type, value: e.target.value })
                        )
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
            <p
              key={unit.id}
              onClick={() => {
                navigate(`/units/${unit.id}`);
              }}
            >
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
