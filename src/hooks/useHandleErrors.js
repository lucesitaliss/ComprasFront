import { errorMesageByStatusCode } from '../constants/errors'
import useAlert from './useAlert'

const useHandleError = () => {
	const Alert = useAlert()

	const handleError = async (error) => {
		const errorMessage =
			errorMesageByStatusCode[error.status] || error.statusText

		console.error('🚀 useFetch', errorMessage)

		Alert.error(errorMessage, {
			timer: 3000,
			timerProgressBar: true,
			showConfirmButton: false,
		})
	}

	const handleAuthError = (response) => {
		const isSessionExpired = response?.status === 401
		const errorMessage =
			errorMesageByStatusCode[response.status] || response.statusText

		if (errorMesageByStatusCode[response.status]) {
			return Alert.error(errorMessage, {
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: false,
				title: 'Error de autenticación',
				text: errorMessage,
				callback: () => {
					if (isSessionExpired) window.location.href = '/shopping-list/login'
				},
			})
		}

		throw new Error(errorMessage)
	}

	return { handleError, handleAuthError }
}

export default useHandleError
