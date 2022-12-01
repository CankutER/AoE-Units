import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters: {
    age: { type: "age", value: "All" },
    Wood: { type: "cost", isChecked: false, value: 0 },
    Food: { type: "cost", isChecked: false, value: 0 },
    Gold: { type: "cost", isChecked: false, value: 0 },
  },
  isLoading: true,
  unitList: [],
};

const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    setAge: (state, action) => {
      state.filters.age.value = action.payload;
    },
    setValue: (state, action) => {
      state.filters[action.payload.type].value = action.payload.value;
    },
    setChecked: (state, action) => {
      state.filters[action.payload].isChecked =
        !state.filters[action.payload].isChecked;
    },
    setUnitList: (state, action) => {
      state.unitList = action.payload;
    },
    requestFetch: (state, action) => {
      // this is just a trigger for saga
      console.log("fetch requested");
    },
  },
});

export const { setAge, setValue, setChecked, setUnitList, requestFetch } =
  unitsSlice.actions;
export default unitsSlice.reducer;
