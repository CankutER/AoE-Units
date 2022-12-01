import { put, call, takeLatest } from "redux-saga/effects";
const url = "/age-of-empires-units.json";
function* fetchDetails(action) {
  const id = action.payload;
  console.log(id);
  try {
    const response = yield call(() => fetch(url));
    if (!response.ok) {
      throw "could not get details";
    }
    const data = yield response.json();
    const units = data.units;

    const unitDetails = units.find((unit) => Number(unit.id) === Number(id));

    yield put({ type: "details/setUnit", payload: unitDetails });
  } catch (err) {}
}

export function* unitWatcher() {
  yield takeLatest("details/requestDetails", fetchDetails);
}