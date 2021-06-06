import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
//smilar to private route which is only for logged in users, i define a new route for admins
//only admins can see the contents of this route

export default function AdminRoute({ component: Component, ...rest }) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        //checking if user is admin
        userInfo && userInfo.isAdmin ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
