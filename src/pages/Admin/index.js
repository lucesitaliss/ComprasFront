import React, { useState } from 'react'
import AdminTabContent from './AdminTabContent'
import AdminTabs from './AdminTabs'
import './admin.css'

export default function Admin() {
	const [tabName, setTabName] = useState('products')

	return (
		<main className="admin-container">
			<AdminTabs setTabName={setTabName} />
			<AdminTabContent name={tabName} />
		</main>
	)
}
