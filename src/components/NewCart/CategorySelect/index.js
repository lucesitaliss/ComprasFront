import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLocalStorageToken } from '../../../features/localStoreToken/localStoreTokenSlice'
import { getToken } from '../../../utils/localStorage'
import { getApiUrl } from '../../../api'
import './categorySelect.css'
import { addCategorySelect } from '../../../features/category/categorySlice'

export default function CategorySelect() {
	const [categories, setCategories] = useState([])
	const { categoryId } = useSelector((state) => state.categorySelect)

	const dispatch = useDispatch()

	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	const handleChange = (e) => {
		if (e.target.value > 0) {
			dispatch(addCategorySelect(Number(e.target.value)))
		}
	}

	const getCategories = async () => {
		try {
			const apiUrl = getApiUrl('categories')
			const response = await fetch(apiUrl, {
				headers: { 'x-acces-token': token },
			})
			const result = await response.json()

			setCategories(result)
		} catch (error) {}
	}

	useEffect(() => {
		getCategories()
	}, [])

	return (
		<select onChange={handleChange} value={categoryId}>
			<option value="">Select category</option>
			{categories.map((category) => (
				<option key={category.category_id} value={category.category_id}>
					{category.category_name}
				</option>
			))}
		</select>
	)
}

CategorySelect.displayName = 'CategorySelect'