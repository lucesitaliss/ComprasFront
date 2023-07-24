import React, { useState, useEffect } from 'react'
import './insert.css'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../../../../utils/localStorage'
import { insertNewCategory } from '../../../../features/listCategory/listCategorySlice'
import { insertNewProduct } from '../../../../features/listProducts/listProductsSlice'
import { getApiUrl } from '../../../../api'
import { setLocalStorageToken } from '../../../../features/localStoreToken/localStoreTokenSlice'

export default function Insert({ name }) {
	const dispatch = useDispatch()

	const { categoryId } = useSelector((state) => state.categorySelect)
	const { token } = useSelector((state) => state.localStorageToken)

	const [input, setInput] = useState({ category: '' })
	const [dataProduct, setDataProduct] = useState({
		product: '',
		category: '',
	})

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	const handleSumit = async (e) => {
		e.preventDefault()
		try {
			if (input) {
				if (name === 'category') {
					const apiUrl = getApiUrl('category')
					const result = await fetch(apiUrl, {
						method: 'POST',
						body: JSON.stringify(input),
						headers: {
							'content-type': 'application/json',
							'x-acces-token': token,
						},
					})
					if (result.ok) {
						const newCategory = await result.json()
						dispatch(insertNewCategory(newCategory))
					}
				}
				if (name === 'product') {
					const apiUrl = getApiUrl('product')
					const result = await fetch(apiUrl, {
						method: 'POST',
						body: JSON.stringify(dataProduct),
						headers: {
							'content-type': 'application/json',
							'x-acces-token': token,
						},
					})
					if (result.ok) {
						const newProduct = await result.json()
						dispatch(insertNewProduct(newProduct))
					}
				}
				e.target.reset()
			}
		} catch (error) {
			console.error(error)
		}
	}

	const handleChange = (event) => {
		const { value } = event.target
		setInput({ category: value })
		setDataProduct({ product: value, category: categoryId })
	}

	return (
		<form className="insert-form" onSubmit={handleSumit}>
			<input
				className="insert-input"
				size="9"
				placeholder={`Insert ${name}`}
				onChange={handleChange}
			/>
			<button>Add</button>
		</form>
	)
}
