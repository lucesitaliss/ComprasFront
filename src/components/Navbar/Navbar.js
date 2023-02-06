import React, { useState, useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "./navbar.css";

export default function Navbar(props) {
  const { tokenLocalStore } = useSelector((state) => state.tokenLocalStore);

  const [current, setCurrent] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  if (!tokenLocalStore) {
    return <Redirect to="/" />;
  }

  const adminNav = {
    login: { id: 1, name: "login", title: "Login", to: "/" },
    cart: { id: 2, name: "cart", title: "Cart", to: "/cart" },
    newCart: { id: 3, name: "newcart", title: "New Cart", to: "/newcart" },
    admin: { id: 4, name: "admin", title: "Admin", to: "/admin" },
  };

  const handleOnClick = (id) => {
    setCurrent(id);
  };

  return (
    <nav>
      {console.log(tokenLocalStore)}
      {Object.entries(adminNav).map(([navName, nav]) => {
        const isCurrent = current === nav.id;
        const isId2 = nav.id === 3;
        const isCart = Object.entries(cart).some((cart) => cart);
        return (
          <NavLink
            key={nav.id}
            to={nav.to}
            onClick={() => handleOnClick(nav.id)}
            className={isCurrent ? "navSelected" : "navNotSelected"}
          >
            {isCart && isId2 ? "Update" : nav.title}
          </NavLink>
        );
      })}
    </nav>
  );
}
