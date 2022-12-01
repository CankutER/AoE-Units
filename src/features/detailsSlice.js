import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unit: {},
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    requestDetails: (state, action) => {},
    setUnit: (state, action) => {
      state.unit = action.payload;
    },
  },
});

export const { requestDetails, setUnit } = detailsSlice.actions;
export default detailsSlice.reducer;
