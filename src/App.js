import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Cart from './pages/Cart/index'
import Admin from './pages/Admin/index'
import Navbar from './components/Navbar/Navbar'
import NewCart from './components/NewCart/index'

import Login from './pages/Login/index'

export default function App() {
	return (
		<Router basename="/shopping-list">
			<Navbar />
			<Route exact path="/">
				<Cart />
			</Route>
			<Route path="/newcart">
				<NewCart />
			</Route>
			<Route path="/update">
				<NewCart />
			</Route>
			<Route path="/admin">
				<Admin />
			</Route>
			<Route path="/login">
				<Login />
			</Route>
		</Router>
	)
}
