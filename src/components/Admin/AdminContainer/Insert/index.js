import React, { useState, useEffect } from 'react'
import './insert.css'
import { useDispatch, useSelector } from 'react-redux'
import { insertNewCategory } from '../../../../features/listCategory/listCategorySlice'
import { insertNewProduct } from '../../../../features/listProducts/listProductsSlice'


export default function Insert({ name }) {
  const dispatch = useDispatch()
  const { categoryId } = useSelector((state) => state.categorySelect)

  const [input, setInput] = useState({ category: '' })
  const [dataProduct, setdataProduct] = useState({
    product: '',
    category: '',
  })


  const handleSumit = async (e) => {
    e.preventDefault()
    try {
      if (input) {
        if (name === 'category') {
          const result = await fetch('http://www.localhost:4000/category', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: { 'content-type': 'application/json' },
          })
          if (result.ok) {
            const newCategory = await result.json()
            dispatch(insertNewCategory(newCategory))
            // navegate('/')
          }
        }
        if (name === 'product') {
          const result = await fetch('http://www.localhost:4000/product', {
            method: 'POST',
            body: JSON.stringify(dataProduct),
            headers: { 'content-type': 'application/json' },
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

  const handleChange = (e) => {
    setInput({ category: e.target.value })
    setdataProduct({ product: e.target.value, category: categoryId })
  }

  return (
    <form className="inser" onSubmit={handleSumit}>
      <input placeholder={`Insert ${name}`} onChange={handleChange} />

      <input type="submit" value="Insertar" />
    </form>
  )
}
