import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { requestDetails } from "../features/detailsSlice";

const UnitDetails = () => {
  const unit = useSelector((state) => state.details.unit);
  const dispatch = useDispatch();
  const { unitId } = useParams();

  useEffect(() => {
    dispatch(requestDetails(unitId));
  }, []);

  return (
    <>
      <p>Name:{unit?.name}</p>
      <p>ID:{unit?.id}</p>
      <p>Accuracy:{unit?.accuracy}</p>
    </>
  );
};
export default UnitDetails;
