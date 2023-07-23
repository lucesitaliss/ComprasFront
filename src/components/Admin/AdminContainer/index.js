import React from 'react'
import AdminTab from '../AdminContainer/AdminTab/index'
import './adminContainer.css'

export default function AdminContainer(props) {
  const { name, show } = props

  if (!show) 
    return null
  
  
  return (
    <div className="style-tab">
      <AdminTab name={name} />
    </div>
  )
}
