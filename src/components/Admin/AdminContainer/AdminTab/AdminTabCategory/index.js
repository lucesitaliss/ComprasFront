import React, { useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import './adminTabCategory.css'
import { useSelector, useDispatch } from 'react-redux'
import { addCategories } from '../../../../../features/listCategory/listCategorySlice'
import Insert from '../../Insert'

export default function AdminTabCategory() {
  const dispatch = useDispatch()

  const { categories } = useSelector((state) => state.listCategory)

  useEffect(() => {
    allCategories()
  }, [])

  const allCategories = async () => {
    try {
      const result = await fetch('http://www.localhost:4000/categories')
      if (result.ok) {
        const categories = await result.json()
        dispatch(addCategories(categories))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCategorie = async (idCategory) => {
    try {
      const result = await fetch(
        `http://www.localhost:4000/category/delete/${idCategory}`,
        {
          method: 'PUT',
        },
      )
      allCategories()
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnCLickDeleteCategorie = (categoryId, categoryName) => {
    try {
      Swal.fire({
        title: 'Delete',
        text: `Are you sure you want to delete the category ${categoryName}?`,
        icon: 'info',
        buttons: ['Cancel', 'Acept'],
      }).then((response) => {
        if (response) {
          deleteCategorie(categoryId)
          Swal.fire({
            text: ' The category has been deleted successfully',
            icon: 'success',
          })
        }
      })
    } catch (error) {
      console.error()
    }
  }

  const editCategory = async (bodyEditCategory) => {
    try {
      const result = await fetch('http://www.localhost:4000/category', {
        method: 'PUT',
        body: JSON.stringify(bodyEditCategory),
        headers: { 'content-type': 'application/json' },
      })
      if (result.ok) {
        const editCategory = await result.json()
        allCategories()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnClickEditCategory = async (currentCategory, id) => {
    try {
      const { value: editedCategory } = await Swal.fire({
        title: 'Edit Category',
        input: 'text',
        inputLabel: 'Insert Category',
        inputValue: currentCategory,
        showCancelButton: true,
      })

      if (editedCategory) {
        const bodyEditCategory = {
          id,
          category: editedCategory,
        }
        // handleOnClickEditCategory(bodyEditCategory)
        editCategory(bodyEditCategory)

        await Swal.fire({
          text: 'The category has been successfully modified',
          icon: 'success',
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <Insert name="category" />
      {categories.map((category) => (
        <div className="listCategories" key={category.id_category}>
          <BiEditAlt
            className="iconEdit"
            onClick={() => {
              handleOnClickEditCategory(
                category.name_category,
                category.id_category,
              )
            }}
          />
          <RiDeleteBin6Line
            className="iconDelete"
            onClick={() => {
              handleOnCLickDeleteCategorie(
                category.id_category,
                category.name_category,
              )
            }}
          />
          {category.name_category}
        </div>
      ))}
    </div>
  )
}
