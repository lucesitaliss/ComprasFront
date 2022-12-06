import React from 'react'
import { useSelector } from 'react-redux'
import { CategorySelect } from './CategorySelect'
import ProductsCheckbox from './ProductsCheckbox/index'
import CleanChecked from '../NewCart/CleanChecked/index'
import './newCart.css'

export default function NewCart() {
  const { categoryId } = useSelector((state) => state.categorySelect)
  return (
    <div className="newCart">
      <div className="selectAndClear">
        <CategorySelect />
        {categoryId ? <CleanChecked /> : ''}
      </div>
      <ProductsCheckbox />
    </div>
  )
}
