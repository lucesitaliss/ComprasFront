import React, { useEffect, useState } from 'react'
import { getApiUrl } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { getToken, removeToken } from '../../utils/localStorage'
import './login.css'
import { Redirect } from 'react-router-dom'
import { setLocalStorageToken } from '../../features/localStoreToken/localStoreTokenSlice'

export default function Login() {
	const [dataLogin, setDataLogin] = useState({
		name: '',
		password: '',
	})
	const [redirectCart, setRedirectCart] = useState(false)
  const [tokenExpired, setTokenExpired] =useState(false)
  const [errorLogin, setErrorLogin] = useState(false)
  const [errorLoginText, setErrorLoginText] = useState("")

	const dispatch = useDispatch()
	const { token } = useSelector((state) => state.localStorageToken)

	useEffect(() => {
		dispatch(setLocalStorageToken(getToken()))
	}, [])

  //Expiration Token
  useEffect(() => {
   if (tokenExpired){
    setRedirectCart(true)
   }
  },[tokenExpired])


	const handlechange = (event) => {
		const { name, value } = event.target
		setDataLogin({ ...dataLogin, [name]: value })
	}

  const errorMesage = {
    401: {id: 401, message:'Required user information'},
    402: {id:402, message:'Incorrect Credentials'},
    403: {id:403, message:'The username or password are not correct'}

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

      Object.values(errorMesage).map((error) =>{
        if (response.status === error.id){
          setErrorLoginText(error.message)
          setErrorLogin(true)
        }else {
          setErrorLoginText('Login is not possible')
          setErrorLogin(true)
        }
      })
    
			const token = await response.json()

			
      if (token) {
				localStorage.setItem('token', token)
				dispatch(setLocalStorageToken(token))
				setRedirectCart(true)
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
			console.error(error)
      
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
      {errorLogin ? <div className='errorLogin'>{errorLoginText}</div> : null}
		</form>
	)
}
