import React, { useEffect } from 'react'
import { NavLink, Redirect, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setLocalStorageToken } from '../../features/localStoreToken/localStoreTokenSlice'
import { getToken } from '../../utils/localStorage'
import './navbar.css'

export default function Navbar() {
	const dispatch = useDispatch()
	const { pathname } = useLocation()
	const { token } = useSelector((state) => state.localStorageToken)
	const { cart } = useSelector((state) => state.cart)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	const isAuthenticated = !!token

	const handleSumitLogout = (event) => {
		event.preventDefault()
		localStorage.clear()
		dispatch(setLocalStorageToken(''))
	}

	if (!token) {
		return <Redirect to="/login" />
	}

	const adminNav = {
		cart: { id: 'cart', title: 'Cart', to: '/' },
		newCart: { id: 'newcart', title: 'New Cart', to: '/newcart' },
		admin: { id: 'admin', title: 'Admin', to: '/admin' },
		login: {
			id: 1,
			to: '/login',
			...(isAuthenticated
				? { name: 'logout', title: 'Logout', onClick: handleSumitLogout }
				: { name: 'login', title: 'Login' }),
		},
	}

	return (
		<div className="header">
			<nav>
				{Object.values(adminNav).map((nav) => {
					const isCurrent = pathname === nav.to
					const isCartLink = nav.id === 'cart'
					const hasOpenCart = Object.entries(cart).some((cart) => cart)
					return (
						<NavLink
							key={nav.id}
							to={nav.to}
							onClick={nav.onClick}
							className={isCurrent ? 'nav-selected' : 'nav-not-selected'}
						>
							{hasOpenCart && isCartLink ? 'Update' : nav.title}
						</NavLink>
					)
				})}
			</nav>
		</div>
	)
}
