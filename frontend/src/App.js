import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BrowserRouter, Route } from "react-router-dom";
import { signout } from "./actions/userActions";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import CartScreen from "./screens/CartScreen";
import HomeScreen from "./screens/HomeScreen";
import OrderScreen from "./screens/OrderScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import SigninScreen from "./screens/SigninScreen";
//if you use anchor on links it automatically refreshes the page thats why i will use link instead of anchor

function App() {
  //to display the count of objects in the cart in real time to the user i first should access the cartItems
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
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
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{" "}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {/* Creating admin settings(only admins can see this space) */}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          {/* Defining a new route for shopping cart screen */}
          <Route path="/cart/:id?" component={CartScreen}></Route>
          {/* Defining a new route for product screen */}
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          {/* Defining a new route for product edit screen */}
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          {/* Defining a new route for sign in screen */}
          <Route path="/signin" component={SigninScreen}></Route>
          {/* Defining a new route for register screen */}
          <Route path="/register" component={RegisterScreen}></Route>
          {/* Defining a new route for shipping screen */}
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          {/* Defining a new route for payment method screen */}
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          {/* Defining a new route for place order screen */}
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          {/* Defining a new route for place order details screen */}
          <Route path="/order/:id" component={OrderScreen}></Route>
          {/* Defining a new route for place profilescreen, only costumers who are logged in users can see the content of this route */}
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>

          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
          ></AdminRoute>

          {/* main route of home screen */}
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
