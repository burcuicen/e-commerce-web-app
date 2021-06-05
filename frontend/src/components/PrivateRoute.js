//to fix the error when after user logout in profile screen
//error is "TypeError: Cannot read property '_id' of undefined"
//the reason of this error is, the fact that users who is not registered, can not see profile settings
//when the user log out in user profile the app crashes, because user becomes unregistered user
//to solve this i will define a private route
import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ component: Component, ...rest }) {
  //get user info
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  return (
    //redirect user to signin screen
    <Route
      {...rest}
      render={(props) =>
        userInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}
