import Swal from 'sweetalert2'
import { useEffect } from 'react'

function useAlert() {
	const defaultOptions = {
		callback: () => {},
		timer: 1500,
		timerProgressBar: true,
		showConfirmButton: false,
		toast: true,
		position: 'top-end',
	}

	const success = (message, options = defaultOptions) => {
		const { callback, ...rest } = options
		const { callback: _, ...restOfDefault } = defaultOptions

		const params = {
			icon: 'success',
			text: message,
			...restOfDefault,
			...rest,
		}
		console.log('🚀  file: useAlert.js:24  params', params)

		Swal.fire(params).then(({ isConfirmed }) => {
			;(params.toast || isConfirmed) && callback && callback()
		})
	}

	const error = (message, options = defaultOptions) => {
		const { callback, ...rest } = options
		const { callback: _, ...restOfDefault } = defaultOptions

		const params = {
			icon: 'error',
			text: message,
			...restOfDefault,
			...rest,
		}

		Swal.fire(params).then(({ isConfirmed }) => {
			;(params.toast || isConfirmed) && callback && callback()
		})
	}

	const warning = (message, options = defaultOptions) => {
		const { callback, ...rest } = options
		const { callback: _, ...restOfDefault } = defaultOptions

		const params = {
			icon: 'warning',
			text: message,
			...restOfDefault,
			...rest,
		}

		Swal.fire(params).then(({ isConfirmed }) => {
			;(params.toast || isConfirmed) && callback && callback()
		})
	}

	useEffect(() => {
		// Configurar las opciones globales de Swal2 aquí si lo deseas
		// Por ejemplo: Swal.setDefaults({ customClass: { confirmButton: 'my-confirm-btn' } });
	}, [])

	return { success, error, warning, Swal }
}

export default useAlert
