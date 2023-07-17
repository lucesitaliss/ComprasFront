import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "sliceCartName",
  initialState,
  reducers: {
    addCart: (state, action) => {
      state.cart = action.payload;
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
