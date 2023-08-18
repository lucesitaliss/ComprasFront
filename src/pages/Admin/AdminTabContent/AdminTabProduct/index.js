import React, { useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { addProducts } from '../../../../features/listProducts/listProductsSlice'
import { setLocalStorageToken } from '../../../../features/localStoreToken/localStoreTokenSlice'
import Insert from '../Insert'
import { getApiUrl } from '../../../../api'
import CategorySelect from '../../../../components/NewCart/CategorySelect'
import { getToken } from '../../../../utils/localStorage'
import './admin-products-tab.css'

export default function AdminTabProduct() {
	const dispatch = useDispatch()
	const { categoryId } = useSelector((state) => state.categorySelect)
	const { products } = useSelector((state) => state.listProducts)
	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	useEffect(() => {
		productsByCategory()
	}, [categoryId])

	const productsByCategory = async () => {
		try {
			if (categoryId) {
				const urlApyCategoryId = getApiUrl(`products/category/${categoryId}`)
				const result = await fetch(urlApyCategoryId, {
					headers: { 'x-acces-token': token },
				})
				const products = await result.json()
				if (result.status === 200) {
					dispatch(addProducts(products))
				}
			}else {
				console.error(products.message)
			}
		} catch (error) {
			Swal.fire({
				Title:'Error',
				text:`${error}`,
				icon: 'error'
			 })
		}
	}

	const handleOnclikDeleteProduct = async (idProduct, nameProduct) => {
		try {
			const bodyDelete = {
				id: idProduct,
			}
			const response = await Swal.fire({
				title: 'Delete',
				text: `Are you sure you want to delete the pruduct ${nameProduct}?`,
				icon: 'info',
				showCancelButton: true,
			})
          if (response.isConfirmed) {
            const statusDeletedProduct = await deleteProduct(bodyDelete)

            if(statusDeletedProduct.status === 200){
            Swal.fire({
              text: ' The category has been deleted successfully',
              icon: 'success',
              showConfirmButton: false,
              timer: 1000,
            })
            }
            else {
            Swal.fire({
              text: `${statusDeletedProduct.message}`,
              icon: 'error',
              })
            }
				  }
			
		} catch (error) {
			console.error('Error deleting product:', error);
                Swal.fire({
                    text: `${error}`,
                    icon: 'error',
                 })
		}
	}

	const deleteProduct = async (bodyDelete) => {
		try {
			const urlApiProductDelete = getApiUrl('product/delete')
			const result = await fetch(urlApiProductDelete, {
				method: 'PUT',
				body: JSON.stringify(bodyDelete),
				headers: {
					'content-type': 'application/json',
					'x-acces-token': token,
				},
			})
			const productDeleted = await result.json()
			if (result.status === 200) {
				productsByCategory()
				return ({status: result.status, mesagge: result.mesagge})
			}else{
				return ({status: result.status, mesagge: result.mesagge})
			}
		} catch (error) {
			console.error(error)
		}
	}

  const editProductF = async (bodyEdit) => {
		try {
			const urlApiInsertProduct = getApiUrl('product')
			const result = await fetch(urlApiInsertProduct, {
				method: 'PUT',
				body: JSON.stringify(bodyEdit),
				headers: {
					'content-type': 'application/json',
					'x-acces-token': token,
				},
			})
      const categoryEdited = await result.json()
			if (result.satus === 200) {
			  productsByCategory()
        return({status: result.status, message : categoryEdited.mesagge })
			}else {
        return({status: result.status, message : categoryEdited.mesagge })
      }
		} catch (error) {
			console.error(error)
		}
	}
	const handleOnClickEdit = async (currentProduct, id) => {
		const { value: editProduct } = await Swal.fire({
			title: 'Edit Product',
			input: 'text',
			inputLabel: 'insert Category',
			inputValue: currentProduct,
			showCancelButton: true,
		})
		if (editProduct) {
      try{

        const bodyEdit = {
          product: editProduct,
          id,
        }
        
        const statusEditProduct = await editProductF(bodyEdit)

        if(statusEditProduct.status === 200){
          await Swal.fire({
            text: 'The product has been successfully modified',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000,
          })
          const updatedProducts = products.map(product =>
            product.product_id === id ? { ...product, product_name: editProduct } : product
          );

          dispatch(addProducts(updatedProducts)); 
        }else {
          Swal.fire({
            text: `${statusEditProduct.message}`,
            icon: 'error',
          })
        }
      }catch(error){
        console.error('Error deleting category:', error);
        Swal.fire({
            text: `${error}`,
            icon: 'error',
         })
      }
    }
	}

	return (
		<>
			<div className="admin-actions">
				<CategorySelect />
				<Insert className="insert" name="product" />
			</div>
			{products.map((product) => (
				<div className="admin-row" key={product.product_id}>
					<span>{product.product_name}</span>
					<div className="admin-row-actions">
						<BiEditAlt
							onClick={() => {
								handleOnClickEdit(product.product_name, product.product_id)
							}}
						/>
						<RiDeleteBin6Line
							onClick={() => {
								handleOnclikDeleteProduct(
									product.product_id,
									product.product_name,
								)
							}}
						/>
					</div>
				</div>
			))}
		</>
	)
}
