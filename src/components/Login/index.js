import React, { useState } from "react";
import "./login.css";
import { getApiUrl } from "../../api";
import { useSelector, useDispatch } from "react-redux";
import { addToken } from "../../features/tokenLocalStoreSlice/tokenLocalStoreSlice";
// import { Redirect } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const { tokenLocalStore } = useSelector((state) => state.tokenLocalStore);
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });
  // const [shouldRedirect, setShouldRedirect] = useState(false);

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
    const token = await response.json();

    localStorage.setItem("token", token);
    const localS = localStorage.getItem("token");
    dispatch(addToken(localS));
    event.target.reset();
  };

  const handleSumitLogout = (event) => {
    event.preventDefault();
    localStorage.clear();
    dispatch(addToken(""));
  };

  // if (shouldRedirect) {
  //   return <Redirect to="/Cart" />;
  // }
  return (
    <form className="loginForm" onSubmit={handleSumitLogin}>
      {console.log(tokenLocalStore)}
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
