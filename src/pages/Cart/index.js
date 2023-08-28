import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../features/cart/cartSlice'
import { setLocalStorageToken } from '../../features/localStoreToken/localStoreTokenSlice'
import { getToken } from '../../utils/localStorage'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { getApiUrl } from '../../api'
import './cart.css'
import WhatsApp from '../../components/images/wapp'

export default function Cart() {
	const [selectProducts, setSelectProducts] = useState({})
	const dispatch = useDispatch()

	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	useEffect(() => {
		getProductsSelections()
	}, [])

	const getProductsSelections = async () => {
		try {
			const urlApiCart = getApiUrl('cart')
			const response = await fetch(urlApiCart, {
				headers: { 'x-acces-token': token },
			})
			const result = await response.json()
			if (response.ok) {
				setSelectProducts(result)
				dispatch(addCart(result))
			}
		} catch (error) {
			console.error(error)
		}
	}

	const deleteCart = async () => {
		const urlApiCart = getApiUrl('cart')
		const response = await fetch(urlApiCart, {
			method: 'DELETE',
			headers: { 'x-acces-token': token },
		})

		if (response.ok) {
			setSelectProducts([])
			dispatch(addCart(''))
		}
	}

	const handleSumitClearList = async (e) => {
		e.preventDefault()
		const confirmationRequest = await Swal.fire({
			text: 'Are you sure you want to delete the cart?',
			icon: 'delete',
			showConfirmButton: true,
			showCancelButton: true,
		})
		if (confirmationRequest.isConfirmed) {
			deleteCart()
		}
	}

	const handleSubmitProductList = async (id, selected) => {
		try {
			const bodyParams = {
				id,
				selected,
			}
			const urlApiCart = getApiUrl('cart')
			const response = await fetch(urlApiCart, {
				method: 'PUT',
				body: JSON.stringify(bodyParams),
				headers: {
					'content-type': 'application/json',
					'x-acces-token': token,
				},
			})
			if (response.ok) {
				getProductsSelections()
			}
		} catch (error) {
			console.error(error)
		}
	}

  const handleSubmitCleanSelected = async () => {
      try{
        const urlApiCart = getApiUrl('delete-cart-selected')
        const response = await fetch(urlApiCart, {
        method: 'DELETE',
				headers: { 'x-acces-token': token },
			})
      if (response.ok){
        getProductsSelections()
      }
    }catch (error) {
      console.error(error)
    }
  }

	const resetCheckedProduct = async (id) => {
		const urlApiResetCheked = getApiUrl(`product/checked/reset/id/${id}`)
		await fetch(urlApiResetCheked, {
			method: 'PUT',
			headers: { 'x-acces-token': token },
		})
	}

	const deleteCartById = async (id) => {
		const urlApiCartId = getApiUrl(`cart/${id}`)
		const response = await fetch(urlApiCartId, {
			method: 'DELETE',
			headers: { 'x-acces-token': token },
		})
		if (response.ok) {
			getProductsSelections()
		}
	}

	const handleSubmitDeleteCartById = (nameCart, idCart, idProduct) => {
		try {
			Swal.fire({
				title: 'Delete',
				text: `Are you sure you want to delete the product ${nameCart} ?`,
				icon: 'info',
				showCancelButton: true,
			}).then((response) => {
				if (response.isConfirmed) {
					DeleteCartById(idCart, idProduct)
					Swal.fire({
						text: 'The category has been deleted successfully',
						icon: 'success',
						showConfirmButton: false,
						timer: 1000,
					})
				}
			})
		} catch (error) {
			console.error(error)
		}
	}

	const DeleteCartById = (idCart, idProduct) => {
		deleteCartById(idCart)
		resetCheckedProduct(idProduct)
	}
 

	const formatProductsForWhatsApp = (selectProducts) => {
		let formattedText = ''

		Object.entries(selectProducts).forEach(([category, products], index) => {
			formattedText += index === 0 ? '' : '--------------------\n'
			formattedText += `*${category.trim()}*\n`

			const selectedProducts = products.filter((product) => product.selected)
			const unselectedProducts = products.filter((product) => !product.selected)
			const sortedProducts = [...unselectedProducts, ...selectedProducts]

			sortedProducts.forEach((product) => {
				const { product_name, selected } = product
				const productName = selected ? `~${product_name.trim()}~` : product_name
				formattedText += `- ${productName.trim()}\n`
			})
		})

		formattedText += '\n\t\t*Shared by Shopping list*\t\t'

		return formattedText
	}

	const handleShareList = async () => {
		const formattedProducts = formatProductsForWhatsApp(selectProducts)

		const url = `https://wa.me?text=${encodeURIComponent(
			formattedProducts,
		)}&share=true`

		window.open(url, '_blank')
	}

	return (
		<div className="cart-container">
			<div className="title-container">
				<h2>List</h2>
				<div className="actions-container">
					<button onClick={handleSumitClearList}>Clear</button>
          <button onClick={handleSubmitCleanSelected}>Clean</button>
					<button onClick={handleShareList} className="share-button">
						<span>Share </span>
						<WhatsApp className="wapp-icon" />
					</button>
				</div>
			</div>

			{Object.entries(selectProducts).map(
				([categoryName, categoryProducts]) => (
					<div className="container-list" key={categoryName}>
						<h3 className="title-category">{categoryName}</h3>
						{categoryProducts.map((product) => (
							<div
								key={product.product_id}
								className="cart-list-item"
								onClick={(event) => {
									if (/path|svg/.test(event.target.nodeName)) return
									handleSubmitProductList(product.cart_id, product.selected)
								}}
							>
								<h5
									className={
										product.selected ? 'selected-product-name' : 'product-name'
									}
								>
									{product.product_name}
								</h5>
								<RiDeleteBin6Line
									className="icon-delete-cart"
									onClick={() => {
										handleSubmitDeleteCartById(
											product.product_name,
											product.cart_id,
											product.product_id,
										)
									}}
								/>
							</div>
						))}
					</div>
				),
			)}
		</div>
	)
}

Cart.displayName = 'Cart'