import React, { useState, useEffect } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { addProducts } from '../../../../../features/listProducts/listProductsSlice'
import { CategorySelect } from '../../../../NewCart/CategorySelect'
import Insert from '../../Insert'
import './adminTabProduct.css'

export default function AdminTabProduct() {
  const dispatch = useDispatch()
  const { categoryId } = useSelector((state) => state.categorySelect)
  const { products } = useSelector((state) => state.listProducts)

  useEffect(() => {
    productsByCategory()
  }, [categoryId])

  const productsByCategory = async () => {
    try {
      if (categoryId > 0) {
        const result = await fetch(
          `http://www.localhost:4000/products/category/${categoryId}`,
        )
        if (result.ok) {
          const products = await result.json()
          dispatch(addProducts(products))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleOnclikDeleteProduct = (idProduct, nameProduct) => {
    try {
      const bodyDelete = {
        id: idProduct,
      }
      Swal.fire({
        title: 'Delete',
        text: `Are you sure you want to delete the pruduct ${nameProduct}?`,
        icon: 'info',
        buttons: ['Cancel', 'Acept'],
      }).then((response) => {
        if (response) {
          // handleOnclikDeleteProduct(bodyDelete)
          deleteProduct(bodyDelete)
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

  const deleteProduct = async (bodyDelete) => {
    try {
      const result = await fetch('http://www.localhost:4000/product/delete/', {
        method: 'PUT',
        body: JSON.stringify(bodyDelete),
        headers: { 'content-type': 'application/json' },
      })
      if (result.ok) {
        productsByCategory()
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
      const bodyEdit = {
        product: editProduct,
        id,
      }
      editCategory(bodyEdit)
      await Swal.fire({
        text: 'The product has been successfully modified',
        icon: 'success',
      })
    }
  }

  const editCategory = async (bodyEdit) => {
    console.log(bodyEdit)
    try {
      const result = await fetch('http://www.localhost:4000/product/', {
        method: 'PUT',
        body: JSON.stringify(bodyEdit),
        headers: { 'content-type': 'application/json' },
      })
      if (result.ok) {
        productsByCategory()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <div className="adminproducts">
        <CategorySelect />
        <Insert className="insert" name="product" />
      </div>
      {products.map((product) => (
        <div className="listProducts" key={product.id_product}>
          <BiEditAlt
            className="iconEditProduct"
            onClick={() => {
              handleOnClickEdit(product.name_product, product.id_product)
            }}
          />
          <RiDeleteBin6Line
            className="iconDeleteProduct"
            onClick={() => {
              handleOnclikDeleteProduct(
                product.id_product,
                product.name_product,
              )
            }}
          />
          {product.name_product}
        </div>
      ))}
    </div>
  )
}
