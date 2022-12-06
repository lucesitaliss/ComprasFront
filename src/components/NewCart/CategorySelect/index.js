import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategorySelect } from '../../../features/category/categorySlice'
import Swal from 'sweetalert2'
import './categorySelect.css'

export function CategorySelect() {
  const [categories, setCategories] = useState([])
  const { categoryId } = useSelector((state) => state.categorySelect)

  const dispatch = useDispatch()

  const handleChange = (e) => {
    if (e.target.value > 0) {
      dispatch(addCategorySelect(Number(e.target.value)))
    }
  }

  const getCategories = async () => {
    try {
      const response = await fetch('http://www.localhost:4000/categories')
      const result = await response.json()
      setCategories(result)
    } catch (error) {}
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="select">
      <select onChange={handleChange} value={categoryId}>
        <option value="">Seleccione una categoria</option>
        {categories.map((category) => (
          <option key={category.id_category} value={category.id_category}>
            {category.name_category}
          </option>
        ))}
      </select>
    </div>
  )
}
