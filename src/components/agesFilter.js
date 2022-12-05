import { ages } from "../utilities/filters";
import { setAge } from "../features/unitsSlice";
import { useAppSelector, useAppDispatch } from "../hook";
import { requestFetch } from "../features/unitsSlice";
const AgesFilter = () => {
  const unitsState = useAppSelector((state) => state.units);
  const dispatch = useAppDispatch();
  const dispatchWithFetch = (action) => {
    dispatch(action);
    dispatch(requestFetch());
  };
  return (
    <section className="form-group ages">
      <h3 className="ages-title">Ages</h3>
      <div className="ages-group">
        {ages.map((age, i) => {
          return (
            <div key={i} className="single-age-container">
              <div>
                <input
                  type="button"
                  name="age"
                  data-testid={age}
                  className={
                    age === unitsState.filters.age.value ? "btn active" : "btn"
                  }
                  value={age}
                  id={`age-${i}`}
                  onClick={(e) => {
                    dispatchWithFetch(setAge(e.target.value));
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AgesFilter;
