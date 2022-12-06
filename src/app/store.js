import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from '../features/category/categorySlice'
import listCategorySlice from '../features/listCategory/listCategorySlice' 
import listProductsSlice from '../features/listProducts/listProductsSlice'
export const store = configureStore({
  reducer: {
    categorySelect: categoryReducer,
    listCategory: listCategorySlice,
    listProducts: listProductsSlice
  },
})
