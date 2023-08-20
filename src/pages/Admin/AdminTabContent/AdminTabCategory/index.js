import React, { useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { addCategories } from '../../../../features/listCategory/listCategorySlice'
import { setLocalStorageToken } from '../../../../features/localStoreToken/localStoreTokenSlice'
import Insert from '../Insert'
import { getApiUrl } from '../../../../api'
import { getToken } from '../../../../utils/localStorage'
import './adminTabCategory.css'

export default function AdminTabCategory() {
	const dispatch = useDispatch()

	const { categories } = useSelector((state) => state.listCategory)
	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	useEffect(() => {
		allCategories()
	}, [])

	const allCategories = async () => {
		try {
			const urlApiCategories = getApiUrl('categories')
			const result = await fetch(urlApiCategories, {
				headers: { 'x-acces-token': token },
			})
      const categories = await result.json();
			if (result.status === 200) {
				dispatch(addCategories(categories))
			} else {
        console.error(categories.message)
      }
		} catch (error) {
      Swal.fire({
				Title:'Error',
				text:`${error}`,
				icon: 'error'
			 })
		}
	}

	const deleteCategorie = async (idCategory) => {
		try {
			const urlApiDeleteCategory = getApiUrl(`category/delete/${idCategory}`)
			const result = await fetch(urlApiDeleteCategory, {
				method: 'PUT',
				headers: { 'x-acces-token': token },
			})
      if(result.status === 200){
        allCategories()
        return({status : result.status, message: result.message})
      }else{
        return({status : result.status, message: result.message})
    }
		} catch (error) {
			console.error(error)
		}
	}

	const handleOnCLickDeleteCategorie = async (categoryId, categoryName) => {
		try {
			const response = await Swal.fire({
				title: 'Delete',
				text: `Are you sure you want to delete the category ${categoryName}?`,
				icon: 'info',
				showCancelButton: true,
			})
				if (response.isConfirmed) {
					try{
						 const statusDeletedCategorie = await deleteCategorie(categoryId)
            if (statusDeletedCategorie.status === 200) {
                	Swal.fire({
                  text: ' The category has been deleted successfully',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1000,
                })
              }else{
                Swal.fire({
                  text: `${statusDeletedCategorie.message}`,
                  icon: 'error',
              })
            }
          }catch (error){
            console.error('Error deleting category:', error);
                Swal.fire({
                    text: `${error}`,
                    icon: 'error',
                 })
				
          }
        }
		} catch (error) {
			console.error('Error displaying confirmation dialog:', error)
		}
	}

	const editCategory = async (bodyEditCategory) => {
		try {
			const UrlApiCategoryUpdate = getApiUrl('category')
			const result = await fetch(UrlApiCategoryUpdate, {
				method: 'PUT',
				body: JSON.stringify(bodyEditCategory),
				headers: {
					'content-type': 'application/json',
					'x-acces-token': token,
				},
			})
      const categoryEdited = await result.json()
			if (result.status === 200) {
				allCategories()
        return ({status: result.status, message: categoryEdited.message})
			}else {
        return ({status: result.status, message: categoryEdited.message})
      }

		} catch (error) {
			console.error(error)
		}
	}

	const handleOnClickEditCategory = async (currentCategory, id) => {
		try {
			const {value: editedCategory } = await Swal.fire({
				title: 'Edit Category',
				input: 'text',
				inputLabel: 'Insert Category',
				inputValue: currentCategory,
				showCancelButton: true,
			})

			if (editedCategory) {
        try{
          const bodyEditCategory = {
            id,
            category: editedCategory,
          }
          const statusEditedCategory = await editCategory(bodyEditCategory)
          if(statusEditedCategory.status === 200){
            await Swal.fire({
              text: 'The category has been successfully modified',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000,
            })
          }else{
            Swal.fire({
              text: `${statusEditedCategory.message}`,
              icon: 'error',
          })
        }
        }catch (error){
          console.error('Error deleting category:', error);
                Swal.fire({
                    text: `${error}`,
                    icon: 'error',
                 })
        }
			}
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<>
			<div className="admin-actions">
				<Insert name="category" />
			</div>
			{categories.map((category) => (
				<div className="admin-row" key={category.category_id}>
					<span>{category.category_name}</span>
					<div className="admin-row-actions">
						<BiEditAlt
							onClick={() => {
								handleOnClickEditCategory(
									category.category_name,
									category.category_id,
								)
							}}
						/>
						<RiDeleteBin6Line
							onClick={() => {
								handleOnCLickDeleteCategorie(
									category.category_id,
									category.category_name,
								)
							}}
						/>
					</div>
				</div>
			))}
		</>
	)
}
