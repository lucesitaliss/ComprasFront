import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tokenLocalStore: localStorage.getItem("token"),
};

export const localSToken = createSlice({
  name: "localSToken",
  initialState,
  reducers: {
    getLocalStoreToken: (state, action) => {
      state.tokenLocalStore = action.payload;
    },
  },
});

export const { getLocalStoreToken } = localSToken.actions;
export default localSToken.reducer;