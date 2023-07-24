import React, { useState } from 'react'
import { func } from 'prop-types'

const adminTabs = {
	products: { title: 'Products', id: 1, name: 'products' },
	categories: { title: 'Categories', id: 2, name: 'categories' },
	users: { title: 'Users', id: 3, name: 'users' },
}

const AdminTabs = (props) => {
	const { setTabName } = props

	const [currentTab, setCurrentTab] = useState(1)

	const handleOnClick = (id, name) => {
		setCurrentTab(id)
		setTabName(name)
	}

	return (
		<div className="tabs">
			{Object.values(adminTabs).map((tab) => {
				const isCurrentTab = currentTab === tab.id
				return (
					<button
						key={tab.id}
						onClick={() => handleOnClick(tab.id, tab.name)}
						className={isCurrentTab ? 'tab-selected' : 'tab-not-selected'}
					>
						{tab.title}
					</button>
				)
			})}
		</div>
	)
}

AdminTabs.propTypes = {
	setTabName: func,
	setShow: func,
}

AdminTabs.displayName = 'AdminTabs'

export default AdminTabs
