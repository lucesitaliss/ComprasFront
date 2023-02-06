import React, { useState } from "react";
import "./login.css";
import { getApiUrl } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../features/tokenLocalStoreSlice/tokenLocalStoreSlice";

export default function Login() {
  const dispatch = useDispatch();
  const { tokenLocalStore } = useSelector((state) => state.tokenLocalStore);
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSumitLogin = async (event) => {
    event.preventDefault();
    const urlLoging = getApiUrl("login");
    const response = await fetch(urlLoging, {
      method: "POST",
      body: JSON.stringify(dataLogin),
      headers: { "content-type": "application/json" },
    });
    event.target.reset();
    const token = await response.json();

    if (token) {
      localStorage.setItem("token", token);
      const localS = localStorage.getItem("token");
      dispatch(addToken(localS));
    }
  };

  const handleSumitLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    dispatch(addToken(""));
  };

  return (
    <form className="loginForm" onSubmit={handleSumitLogin}>
      <input placeholder="Enter the user" name="name" onChange={handlechange} />
      <input
        placeholder="Enter the password"
        name="password"
        onChange={handlechange}
      />
      <input
        className={!tokenLocalStore ? "accepButton" : "accepButtonDisable"}
        type="submit"
        value="Login"
        disable={tokenLocalStore}
      />
      <input
        className={tokenLocalStore ? "accepButton" : "accepButtonDisable"}
        type="submit"
        value="Logout"
        onClick={handleSumitLogout}
        disable={!tokenLocalStore}
      />
    </form>
  );
}
