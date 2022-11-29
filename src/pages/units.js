import { ages, costTypes } from "../utilities/filters";

const Units = () => {
  return (
    <article className="content">
      <form className="filter-form">
        <section className="form-group ages">
          <h3>Ages</h3>
          {ages.map((age, i) => {
            return (
              <>
                <input
                  type="radio"
                  name="age"
                  checked={i === 0 ? true : false}
                  key={i}
                  id={`age-${i}`}
                />
                <label htmlFor={`age-${i}`}>{age}</label>
              </>
            );
          })}
        </section>
        <section className="form-group costs">
          <h3>Costs</h3>
          {costTypes.map((type, i) => {
            return (
              <div className="cost-group" key={i}>
                <div className="single-cost">
                  <div className="cost-control">
                    <input type="checkbox" name="cost" id={`${type}Check`} />
                    <label htmlFor={`${type}Check`}>{type}</label>
                  </div>
                  <div className="cost-control">
                    <input type="range" min={0} max={200} id={`${type}Range`} />
                    <label htmlFor={`${type}Range`}>0-200</label>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </form>
    </article>
  );
};
export default Units;
