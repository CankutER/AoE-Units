import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { requestDetails, setUnit, setError } from "../features/detailsSlice";

const UnitDetails = () => {
  const unit = useSelector((state) => state.details.unit);
  const errorFlag = useSelector((state) => state.details.errorFlag);
  const dispatch = useDispatch();
  const { unitId } = useParams();

  useEffect(() => {
    dispatch(requestDetails(unitId));
    return () => {
      dispatch(setUnit({}));
      dispatch(setError(false));
    };
  }, [dispatch, unitId]);

  return (
    <section className="unit-details">
      {!errorFlag ? (
        <table className="custom-table table table-bordered">
          <tbody>
            <tr>
              <td>ID:</td>
              <td>{unit?.id || "-"}</td>
            </tr>
            <tr>
              <td>Name:</td>
              <td>{unit?.name || "-"}</td>
            </tr>
            <tr>
              <td>Min. Required Age:</td>
              <td>{unit?.age || "-"}</td>
            </tr>
            <tr>
              <td>Wood Cost:</td>
              <td>{unit?.cost?.Wood || "-"}</td>
            </tr>
            <tr>
              <td>Food Cost:</td>
              <td>{unit?.cost?.Food || "-"}</td>
            </tr>
            <tr>
              <td>Gold Cost:</td>
              <td>{unit?.cost?.Gold || "-"}</td>
            </tr>
            <tr>
              <td>Build Time:</td>
              <td>{unit["build_time"] || "-"}</td>
            </tr>
            <tr>
              <td>Reload Time:</td>
              <td>{unit["reload_time"] || "-"}</td>
            </tr>
            <tr>
              <td>Hit Points:</td>
              <td>{unit["hit_points"] || "-"}</td>
            </tr>
            <tr>
              <td>Attack:</td>
              <td>{unit?.attack || "-"}</td>
            </tr>
            <tr>
              <td>Accuracy:</td>
              <td>{unit?.accuracy || "-"}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <h3 className="details-error">
          No such unit found, please make sure you are looking for an existing
          unit
        </h3>
      )}
    </section>
  );
};
export default UnitDetails;
