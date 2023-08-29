export function getToken() {
	const lsToken = localStorage.getItem('token')
	return lsToken
}

export function removeToken() {
	localStorage.removeItem('token');
  }