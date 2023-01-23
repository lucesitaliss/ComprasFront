import React, { useState } from "react";
import "./login.css";
import { getApiUrl } from "../../api";
import { Redirect } from "react-router-dom";

export default function Login() {
  const [dataLogin, setDataLogin] = useState({
    name: "",
    password: "",
  });
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handlechange = (event) => {
    const { name, value } = event.target;
    setDataLogin({ ...dataLogin, [name]: value });
  };

  const handleSumit = async (event) => {
    event.preventDefault();
    const urlLoging = getApiUrl("login");
    const login = await fetch(urlLoging, {
      method: "POST",
      body: JSON.stringify(dataLogin),
      headers: { "content-type": "application/json" },
    });
    if (login.redirected) {
      setShouldRedirect(true);
    }
  };
  if (shouldRedirect) {
    return <Redirect to="/Cart" />;
  }
  return (
    <form className="loginForm" onSubmit={handleSumit}>
      <input placeholder="Enter the user" name="name" onChange={handlechange} />
      <input
        placeholder="Enter the password"
        name="password"
        onChange={handlechange}
      />
      <input className="accepButton" type="submit" value="Accept" />
    </form>
  );
}
