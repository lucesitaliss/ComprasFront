import React, { useEffect, useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getLocalStoreToken } from "../../features/localStoreToken/localStoreTokenSlice";
import localStoreToken from "../Utils/localStoreToken";
import "./navbar.css";

export default function Navbar(props) {
  const dispatch = useDispatch();

  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);

  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);
 
  const { cart } = useSelector((state) => state.cart);
  const [current, setCurrent] = useState(0);

  if (!tokenLocalStore) {
    return <Redirect to="/login" />;
  }

  const adminNav = {
    cart: { id: 2, name: "cart", title: "Cart", to: "/" },
    newCart: { id: 3, name: "newcart", title: "New Cart", to: "/newcart" },
    admin: { id: 4, name: "admin", title: "Admin", to: "/admin" },
    login: { id: 1, name: "login", title: "Login", to: "/login" },
  };

  const handleOnClick = (id) => {
    setCurrent(id);
  };

  return (
    <nav>
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
