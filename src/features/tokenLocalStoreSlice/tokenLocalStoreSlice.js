import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tokenLocalStore: "",
};

export const setTokenLocalStore = createSlice({
  name: "tokenLocalStore",
  initialState,
  reducers: {
    addToken: (state, action) => {
      state.tokenLocalStore = action.payload;
    },
  },
});
export const { addToken } = setTokenLocalStore.actions;
export default setTokenLocalStore.reducer;
