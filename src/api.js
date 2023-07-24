const BASE_API_URL = 'https://cart.cyclic.app'
const BASE_API_LOCAL_URL = 'http://www.localhost:4000'

export const getApiUrl = (urlSegment) => {
	// const url = `${BASE_API_LOCAL_URL}/${urlSegment}`
	const url = `${BASE_API_URL}/${urlSegment}`

	return url
}
