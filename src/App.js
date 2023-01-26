import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/Cart/index";
import Admin from "./components/Admin/index";
import Navbar from "./components/Navbar/Navbar";
import NewCart from "./components/NewCart/index";
import { Provider } from "react-redux";
import { store } from "../src/app/store";
// import Home from "./components/Home/index";
import Login from "./components/Login/index";
import { getApiUrl } from "./api";
import io from "socket.io-client";

const url = getApiUrl("");
const socket = io(url);
console.log("socket", socket);

export default function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(null);

  // useEffect(() => {
  //   socket.on("isLoggedIn", (isLoggedIn) => {
  //     setIsLoggedIn(isLoggedIn);
  //   });
  // }, []);

  return (
    <Provider store={store}>
      <Router basename="/comprasfront">
        {/* <Navbar isLoggedIn={isLoggedIn} /> */}
        <Navbar />

        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/newcart">
          <NewCart />
        </Route>
        <Route path="/update">
          <NewCart />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </Provider>
  );
}
