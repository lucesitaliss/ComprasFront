import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
}

export const listProductsSlice = createSlice({
  name: 'listProducts',
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = action.payload
    },
    insertNewProduct: (state, action) => {
      state.products.push(action.payload)
    },
  },
})

export const { addProducts } = listProductsSlice.actions
export const { insertNewProduct } = listProductsSlice.actions
export default listProductsSlice.reducer
