import { put, takeLatest, call } from "redux-saga/effects";
import fetchAndFilter from "../utilities/fetchAndFilter";
import store from "../store";
const url = "/age-of-empires-units.json";

function* fetchUnits() {
  const unitsState = store.getState().units;

  try {
    const units = yield call(fetchAndFilter, { url, unitsState });

    yield put({ type: "units/setUnitList", payload: units });
  } catch (err) {
    console.log(err);
  }
}

export default function* fetchWatcher() {
  yield takeLatest("units/requestFetch", fetchUnits);
}
