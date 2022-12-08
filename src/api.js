export const api= () =>{

    const projectStatus = 'production'
    const url = projectStatus === 'development' ? 'localhost:3000' : 'https://comprasbackend-production.up.railway.app/'
    return url
}
