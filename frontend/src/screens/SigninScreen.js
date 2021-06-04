import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SigninScreen() {
  //react hooks for signin screen
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    //i will implement sign in action here later
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Sign In</h1>
        </div>
        <div>
          <label htmlFor="email">E-mail Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Sign In
          </button>
        </div>
        <div>
          <label />
          <div>
            New to Venus Jewerly?{" "}
            <Link to="/register">Create your account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
