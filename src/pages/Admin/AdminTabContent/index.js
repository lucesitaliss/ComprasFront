import React from 'react'
import AdminTabCategory from './AdminTabCategory'
import AdminTabProduct from './AdminTabProduct'
import AdminTabUser from './AdminTabUser'
import './admin-tab-content.css'

export default function AdminTabContent(props) {
	const { name } = props

	const tabs = {
		categories: AdminTabCategory,
		products: AdminTabProduct,
		users: AdminTabUser,
	}

	const AdminTab = tabs[name]

	if (!name) {
		return null
	}

	return (
		<div className="tabs-content">
			<AdminTab />
		</div>
	)
}
