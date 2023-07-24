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
		changeCheckedAccion: (state, action) => {
			state.products.map((product) => {
				if (product.product_id === action.payload.product_id) {
					product.checked = action.payload.checked
				}
				return product
			})
		},
	},
})

export const { addProducts } = listProductsSlice.actions
export const { insertNewProduct } = listProductsSlice.actions
export const { changeCheckedAccion } = listProductsSlice.actions
export default listProductsSlice.reducer
