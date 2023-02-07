import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getLocalStoreToken } from "../../../../../features/localStoreToken/localStoreTokenSlice";
import localStoreToken from "../../../../Utils/localStoreToken";
import { getApiUrl } from "../../../../../api";
import './adminTabUser.css'

export default function AdminTabUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocalStoreToken(localStoreToken()));
  }, []);

  const { tokenLocalStore } = useSelector((state) => state.localStoreToken);

  const [dataCreateUser, setDataCreateUser] = useState({
    name: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setDataCreateUser({ ...dataCreateUser, [name]: value });
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    const urlNewUser = getApiUrl("newuser");
    await fetch(urlNewUser, {
      method: "POST",
      body: JSON.stringify(dataCreateUser),
      headers: {
        "content-type": "application/json",
        "x-acces-token": tokenLocalStore,
      },
    });
  };

  return (
    <form onSubmit={handleSumit} className="userAdminForm">
      {console.log(dataCreateUser)}
      <input placeholder="Username" name="name" onChange={handlechange} />
      <input placeholder="Password" name="password" onChange={handlechange} />
      <input type="submit" value="Create user" />
    </form>
  );
}
