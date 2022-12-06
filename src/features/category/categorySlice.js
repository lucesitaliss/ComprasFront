import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: null,
}

export const categorySlice = createSlice({
  name: 'categorySelect',
  initialState,
  reducers: {
    addCategorySelect: (state, action) => {
      state.categoryId = action.payload
    },
  },
})

export const { addCategorySelect } = categorySlice.actions
export default categorySlice.reducer
