import { requestFetch } from "../features/unitsSlice";
import { useEffect } from "react";
import AgesFilter from "../components/agesFilter";
import CostFilter from "../components/costFilter";
import UnitsList from "../components/unitsList";
import { useAppDispatch } from "../hook";
import { useNavigate } from "react-router-dom";

const Units = () => {
  // Including requestFetch to create a single point of entry for saga as there are multiple inputs triggering state change, goal is to prevent race conditions
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //
  useEffect(() => {
    dispatch(requestFetch());
  }, [dispatch]);
  return (
    <article className="age-content">
      <form className="filter-form">
        <AgesFilter />

        <CostFilter />
      </form>
      <UnitsList navigate={navigate} />
    </article>
  );
};
export default Units;
