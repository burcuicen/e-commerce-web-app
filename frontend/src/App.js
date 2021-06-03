import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
//if you use anchor on links it automatically refreshes the page thats why i will use link instead of anchor

function App() {
  //to display the count of objects in the cart in real time to the user i first should access the cartItems
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              venus
            </Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </Link>
            <Link to="/signin">Sign In</Link>
          </div>
        </header>
        <main>
          {/* Defining a new route for shopping cart screen */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          {/* Defining a new route for product screen */}
          <Route path="/product/:id" component={ProductScreen}></Route>
          {/* main route of home screen */}
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
