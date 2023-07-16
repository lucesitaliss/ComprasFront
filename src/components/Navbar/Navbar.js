import React, { useEffect } from "react"
import { NavLink, Redirect, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { getLocalStoreToken } from "../../features/localStoreToken/localStoreTokenSlice"
import localStoreToken from "../Utils/localStoreToken"
import "./navbar.css"

export default function Navbar(props) {
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const { tokenLocalStore } = useSelector((state) => state.localStoreToken)
  const { cart } = useSelector((state) => state.cart)

  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()))
  }, [])

  const isAuthenticated = !!tokenLocalStore

  const handleSumitLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    dispatch(getLocalStoreToken(""))
  }

  if (!tokenLocalStore) {
    return <Redirect to="/login" />
  }

  const adminNav = {
    cart: { id: "cart", title: "Cart", to: "/" },
    newCart: { id: "newcart", title: "New Cart", to: "/newcart" },
    admin: { id: "admin", title: "Admin", to: "/admin" },
    login: {
      id: 1,
      to: "/login",
      ...(isAuthenticated
        ? { name: "logout", title: "Logout", onClick: handleSumitLogout }
        : { name: "login", title: "Login" }),
    },
  }

  return (
    <nav>
      {Object.values(adminNav).map((nav) => {
        const isCurrent = pathname.slice(1, pathname.length) === nav.id
        const isCartLink = nav.id === "cart"
        const hasOpenCart = Object.entries(cart).some((cart) => cart)

        return (
          <NavLink
            key={nav.id}
            to={nav.to}
            onClick={nav.onClick}
            className={isCurrent ? "navSelected" : "navNotSelected"}
          >
            {hasOpenCart && isCartLink ? "Update" : nav.title}
          </NavLink>
        )
      })}
    </nav>
  )
}
