import React from 'react'
import AdminTabCategory from './AdminTabCategory'
import AdminTabProduct from './AdminTabProduct'
import AdminTabUser from './AdminTabUser'
import './adminTab.css'

export default function AdminTab({ name }) {
  if (name === 'category') {
    console.log(name)
    return <AdminTabCategory />
  }
  if (name === 'product') {
    return <AdminTabProduct />
  }
  if (name === 'user') {
    return <AdminTabUser />
  }

  
}
