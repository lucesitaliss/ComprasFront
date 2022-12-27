import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

import { useSelector } from "react-redux";

export default function Navbar() {
  const [current, setCurrent] = useState(0);
  const { cart } = useSelector((state) => state.cart);

  const adminNav = {
    cart: { id: 1, name: "cart", title: "Cart", to: "/" },
    newCart: { id: 2, name: "newcart", title: "New Cart", to: "/newcart" },
    admin: { id: 3, name: "admin", title: "Admin", to: "/admin" },
  };

  const handleOnClick = (id) => {
    setCurrent(id);
  };

  return (
    <nav>
      {Object.entries(adminNav).map(([navName, nav]) => {
        const isCurrent = current === nav.id;
        const isId2 = nav.id === 2;
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
