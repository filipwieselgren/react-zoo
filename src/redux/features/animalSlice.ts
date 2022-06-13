import { createSlice } from "@reduxjs/toolkit";

export const animalSlice = createSlice({
  name: "animals",
  initialState: {
    value: false,
  },
  reducers: {
    isFed: (state) => {
      state.value = true;
    },

    isNotFed: (state) => {
      state.value = false;
    },
  },
});

export const { isFed, isNotFed } = animalSlice.actions;

export default animalSlice.reducer;
