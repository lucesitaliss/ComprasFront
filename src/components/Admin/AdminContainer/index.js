import React from 'react'
import AdminTab from '../AdminContainer/AdminTab/index'
import './adminContainer.css'
export default function AdminContainer(props) {
  if (!props.show) {
    return null
  }
  const { name } = props
  return (
    <div   className="styleTab">
      
      <AdminTab  name={name} />
    </div>
  )
}
