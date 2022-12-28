import React from "react";
import "./login.css";

export default function Login() {
  return (
   
        <form className="loginForm">
          <input placeholder="Enter the user" />
          <input placeholder="Enter the password" />
          <input className="accepButton" type="submit" value="Accept" />
        </form>
    
  );
}
