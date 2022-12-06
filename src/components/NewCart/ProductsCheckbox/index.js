import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './productCheckbox.css'

export default function ProductsCheckbox() {
  const { categoryId } = useSelector((state) => state.categorySelect)
  const [products, setProducts] = useState([])

  useEffect(() => {
    categoryId && getProductsByCategory()
  }, [categoryId])

  const navegate = useNavigate()
  const getProductsByCategory = async () => {
    if (categoryId > 0) {
      const response = await fetch(
        `http://www.localhost:4000/products/category/${categoryId}`,
      )
      const result = await response.json()
      setProducts(result)
    }
  }

  const invertChecked = (checked) => {
    if (checked) {
      checked = false
      return checked
    }
    checked = true
    return checked
  }

  const handleChange = async (e) => {
    try {
      console.log('e.targetonchange', e.target)
      const oldValueChecked = await fetch(
        `http://www.localhost:4000/product/checked/id/${e.target.id}`,
      )
      const objectchecked = await oldValueChecked.json()
      const checked = objectchecked.checked

      const dataBody = {
        valueChecked: invertChecked(checked),
        idProduct: e.target.id,
      }

      const updateChecked = await fetch(
        'http://www.localhost:4000/product/checked',
        {
          method: 'PUT',
          body: JSON.stringify(dataBody),
          headers: { 'content-type': 'application/json' },
        },
      )
      getProductsByCategory()
    } catch (error) {
      console.error(error)
    }
  }

  const insertCart = async () => {
    try {
      const getProducts = await fetch('http://www.localhost:4000/products')
      const allProducts = await getProducts.json()
      const selectProducts = allProducts.filter(
        (products) => products.checked === true,
      )

      const response = await fetch('http://www.localhost:4000/cart', {
        method: 'POST',
        body: JSON.stringify(selectProducts),
        headers: { 'content-type': 'application/json' },
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSumit = async (e) => {
    e.preventDefault()
    await insertCart()
    navegate('/')
  }

  return (
    <form className="formProductCheckbox" onSubmit={handleSumit}>
      <input
        className={categoryId ? 'sendButtonActive' : 'sendButtonDesactive'}
        type="submit"
        value="Actualizar"
        name="send"
      />

      {products.map((product) => (
        <label className="productSelect" key={product.id_product}>
          <input
            id={product.id_product}
            type="checkbox"
            onChange={handleChange}
            checked={product.checked}
          />
          {product.name_product}
        </label>
      ))}
    </form>
  )
}
