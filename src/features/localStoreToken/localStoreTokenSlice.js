import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: localStorage.getItem('token'),
}

export const localStorageToken = createSlice({
	name: 'localSToken',
	initialState,
	reducers: {
		setLocalStorageToken: (state, action) => {
			state.token = action.payload
		},
	},
})

export const { setLocalStorageToken } = localStorageToken.actions
export default localStorageToken.reducer
