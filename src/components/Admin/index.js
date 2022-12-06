import React, { useState, useEffect } from 'react'
import AdminContainer from './AdminContainer/index'
import './admin.css'

export default function Admin() {
  const [currentTab, setCurrentTab] = useState(0)
  const [tabName, setTabName] = useState('')
  const [show, setShow] = useState(false)

  const adminTabs = {
    users: { title: 'Users', id: 2, name: 'user' },
    categories: { title: 'Categories', id: 1, name: 'category' },
    products: { title: 'Products', id: 3, name: 'product' },
  }

  const handleOnClick = (id, name) => {
    setCurrentTab(id)
    setShow(true)
    setTabName(name)
  }

  return (
    <div className="tab">
      {Object.entries(adminTabs).map(([tabName, tab]) => {
        const isCurrentTab = currentTab === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => handleOnClick(tab.id, tab.name)}
            className={isCurrentTab ? 'butonSelected' : 'buttonNotSelected'}
          >
            {tab.title}
          </button>
        )
      })}
      <AdminContainer
        show={show}
        name={tabName}
      />
    </div>
  )
}
