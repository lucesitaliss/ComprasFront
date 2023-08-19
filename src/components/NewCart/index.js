import React from 'react'
import CategorySelect from './CategorySelect'
import ProductsCheckbox from './ProductsCheckbox/index'

import './newCart.css'

export default function NewCart() {
	return (
		<div className="newCart">
			<ProductsCheckbox />
		</div>
	)
}
