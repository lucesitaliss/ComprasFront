import React, { useEffect, useState } from 'react'
import { getApiUrl } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { getToken, removeToken } from '../../utils/localStorage'
import './login.css'
import { Redirect } from 'react-router-dom'
import { setLocalStorageToken } from '../../features/localStoreToken/localStoreTokenSlice'
import useAlert from '../../hooks/useAlert'
import { errorMesageByStatusCode } from '../../constants/errors'

export default function Login() {
	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.localStorageToken)
	const Alert = useAlert()

	const [redirectCart, setRedirectCart] = useState(false)
	const [tokenExpired, setTokenExpired] = useState(false)
	const [dataLogin, setDataLogin] = useState({
		name: '',
		password: '',
	})

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

	//Expiration Token
	useEffect(() => {
		if (tokenExpired) {
			setRedirectCart(true)
		}
	}, [tokenExpired])

	const handlechange = (event) => {
		const { name, value } = event.target
		setDataLogin({ ...dataLogin, [name]: value })
	}

	const handleSumitLogin = async (event) => {
		event.preventDefault()
		const Toast = Alert.Swal.mixin({
			toast: true,
			position: 'top-end',
			timer: 3000,
			timerProgressBar: true,
			showConfirmButton: false,
		}).fire({
			icon: 'info',
			text: 'Login in progress',
		})

		try {
			const urlLoging = getApiUrl('login')
			const response = await fetch(urlLoging, {
				method: 'POST',
				body: JSON.stringify(dataLogin),
				headers: { 'content-type': 'application/json' },
			})

			if (errorMesageByStatusCode.hasOwnProperty(response.status)) {
				Alert.error(errorMesageByStatusCode[response.status], {
					icon: 'error',
					timer: 3000,
				})
			}

			const token = await response.json()

			if (token) {
				Toast.close()
				Alert.success('Loading successfuly, you are being redirected', {
					callback: () => {
						localStorage.setItem('token', token)
						dispatch(setLocalStorageToken(token))
						setRedirectCart(true)
						setDataLogin({ name: '', password: '' })
					},
				})
			}

			event.target.reset()

			//expired Token
			const tokenExpiration = 7200 //time in second
			const tokenTimer = setTimeout(() => {
				removeToken()
				dispatch(setLocalStorageToken(null))
				setTokenExpired(true)
			}, tokenExpiration * 1000)

			return () => {
				clearTimeout(tokenTimer)
			}
		} catch (error) {
			console.error({ error })
		}
	}

	return (
		<form className="loginForm" onSubmit={handleSumitLogin}>
			<input placeholder="Enter the user" name="name" onChange={handlechange} />
			<input
				placeholder="Enter the password"
				name="password"
				type="password"
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
