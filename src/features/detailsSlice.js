import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: {},
  errorFlag: false,
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    requestDetails: (state, action) => {},
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
    setError: (state, action) => {
      state.errorFlag = action.payload;
    },
  },
});

export const { requestDetails, setUnit, setError } = detailsSlice.actions;
export default detailsSlice.reducer;
