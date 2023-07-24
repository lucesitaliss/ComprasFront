import React, { useEffect, useState } from 'react'
import { getApiUrl } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { getToken } from '../../utils/localStorage'
import './login.css'
import { Redirect } from 'react-router-dom'
import { setLocalStorageToken } from '../../features/localStoreToken/localStoreTokenSlice'

export default function Login() {
	const [dataLogin, setDataLogin] = useState({
		name: '',
		password: '',
	})
	const [redirectCart, setRedirectCart] = useState(false)
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	const handlechange = (event) => {
		const { name, value } = event.target
		setDataLogin({ ...dataLogin, [name]: value })
	}

	const handleSumitLogin = async (event) => {
		try {
			event.preventDefault()
			const urlLoging = getApiUrl('login')
			const response = await fetch(urlLoging, {
				method: 'POST',
				body: JSON.stringify(dataLogin),
				headers: { 'content-type': 'application/json' },
			})
			const token = await response.json()

			if (token) {
				localStorage.setItem('token', token)
				dispatch(setLocalStorageToken(token))
				setRedirectCart(true)
			}
			event.target.reset()
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<form className="loginForm" onSubmit={handleSumitLogin}>
			<input placeholder="Enter the user" name="name" onChange={handlechange} />
			<input
				placeholder="Enter the password"
				name="password"
				onChange={handlechange}
			/>
			<input
				className={!token ? 'accepButton' : 'accepButtonDisable'}
				type="submit"
				value="Login"
				disabled={token}
			/>
			{redirectCart ? <Redirect to="/" /> : null}
		</form>
	)
}
