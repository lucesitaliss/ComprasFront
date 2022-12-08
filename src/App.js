import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "./components/Cart/index";
import Admin from "./components/Admin/index";
import Navbar from "./components/Navbar/Navbar";
import NewCart from "./components/NewCart/index";
import { Provider } from "react-redux";
import { store } from "../src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <Router basename="/comprasfront">
        <Navbar />
        <Route exact path="/">
          <Cart />
        </Route>
        <Route path="/newcart">
          <NewCart />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
      </Router>
    </Provider>
  );
}
