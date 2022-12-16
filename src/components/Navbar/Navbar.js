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
  const condicionalNameNav = (title) => {
    if (cart) {
      return "Update";
    }
    return title;
  };

  return (
    <nav>
      {Object.entries(adminNav).map(([navName, nav]) => {
        const isCurrent = current === nav.id;
        const isNewCart = nav.id === 2;
        return (
          <NavLink
            key={nav.id}
            to={nav.to}
            onClick={() => handleOnClick(nav.id)}
            className={isCurrent ? "navSelected" : "navNotSelected"}
          >
            {/* {isNewCart && cart ? "Update" : nav.title} */}
            {nav.title}
          </NavLink>
        );
      })}
    </nav>
  );
}
