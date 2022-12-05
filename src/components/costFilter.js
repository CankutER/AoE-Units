import { useAppSelector, useAppDispatch } from "../hook";
import { costTypes } from "../utilities/filters";
import { setChecked, setValue } from "../features/unitsSlice";
import { requestFetch } from "../features/unitsSlice";
const CostFilter = () => {
  const unitsState = useAppSelector((state) => state.units);
  const dispatch = useAppDispatch();
  const dispatchWithFetch = (action) => {
    dispatch(action);
    dispatch(requestFetch());
  };
  return (
    <section className="form-group costs">
      <h3 className="cost-heading">Costs</h3>
      <div className="cost-filters">
        {costTypes.map((type, i) => {
          return (
            <div className="cost-group" key={i}>
              <div className="single-cost">
                <div className="cost-control">
                  <input
                    className="cost-check"
                    type="checkbox"
                    checked={unitsState.filters[type].isChecked === true}
                    aria-checked={unitsState.filters[type].isChecked === true}
                    onChange={() => dispatchWithFetch(setChecked(type))}
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
                    data-testid={`${type}Range`}
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
      </div>
    </section>
  );
};

export default CostFilter;
