import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getApiUrl } from '../api'
import useHandleError from './useHandleErrors'
import useAlert from './useAlert'

function useFetch() {
	const { token } = useSelector((state) => state.localStorageToken)
	const { handleError, handleAuthError } = useHandleError()
	const Alert = useAlert()

	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const params = {
		method: 'GET',
		body: null,
		headers: { 'Content-Type': 'application/json', 'x-acces-token': token },
	}

	const executeRequest = useCallback(async (path, options = params) => {
		setLoading(true)
		try {
			const url = getApiUrl(path)
			const fetchOptions = {
				...params,
				...options,
				...(options.body && { body: JSON.stringify(options.body) }),
			}

			const response = await fetch(url, fetchOptions)

			if (response.ok) {
				const result = await response.json()

				setData(result)
				setLoading(false)

				return result
			}

			handleAuthError(response)
		} catch (error) {
			setError(error)
			setLoading(false)
			handleError(error)
		}
	}, [])

	useEffect(() => {
		return () => {
			setData(null)
			setLoading(false)
			setError(null)
		}
	}, [])

	return { data, loading, error, executeRequest }
}

export default useFetch
