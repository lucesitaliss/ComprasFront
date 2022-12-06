import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  categories: [],
}

export const listCategorySlice = createSlice({
  name: 'listCategory',
  initialState,
  reducers: {
    addCategories: (state, action) => {
      state.categories = action.payload
    },
    insertNewCategory: (state, action) => {
      state.categories.push(action.payload)
    },
  },
})

export const { addCategories } = listCategorySlice.actions
export const { insertNewCategory } = listCategorySlice.actions
export default listCategorySlice.reducer
