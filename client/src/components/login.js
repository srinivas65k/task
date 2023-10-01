/* eslint-disable jsx-a11y/anchor-is-valid */
import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { userContext } from "../App";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [tab, setTab] = useState("login");
  const { getUserData, userData } = useContext(userContext);
  const [loginForm, setLoginForm] = useState();
  const [signupForm, setSignUpForm] = useState();
  const navigate = useNavigate();

  const handleClick = () => {
    setTab(tab === "login" ? "signup" : "login");
  };

  const onLoginFormChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const onSignUpFormChange = (event) => {
    setSignUpForm({
      ...signupForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const url = "http://localhost:4001/login";

    const data = {
      url: url,
      method: "POST",
      data: loginForm,
    };
    try {
      const response = await axios(data);
      console.log("data=======", response);
      if (response?.status) {
        sessionStorage.setItem("token", response?.data?.data);
        await getUserData();
        navigate("/dashboard");
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  const signUp = async () => {
    const url = "http://localhost:4001/adminSignUp";

    const data = {
      url: url,
      method: "POST",
      data: signupForm,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform signup", response);
      if (response?.status) {
        alert("User created succesfully");
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  useEffect(() => {
    let token = sessionStorage.getItem('token')
    if (userData != null && token) {
      navigate("/dashboard");
    }
  });

  return (
    <div className="App">
      {tab === "login" && (
        <React.Fragment>
          <h3>Login</h3>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                onChange={onLoginFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                onChange={onLoginFormChange}
                required
              />
            </div>
            <div>
              <button type="submit">Sumbit</button>
            </div>
          </form>
        </React.Fragment>
      )}
      {tab === "signup" && (
        <React.Fragment>
          <h3>SignUp as Admin</h3>
          <form onSubmit={signUp}>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input
                id="fullName"
                name="fullName"
                onChange={onSignUpFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                onChange={onSignUpFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                onChange={onSignUpFormChange}
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                onChange={onSignUpFormChange}
                required
              />
            </div>
            <div>
              <button type="submit">Sumbit</button>
            </div>
          </form>
        </React.Fragment>
      )}
      <p>
        Click Here to{" "}
        <Link onClick={handleClick}>
          {tab === "login" ? "SignUp" : "SignIn"}
        </Link>
      </p>
    </div>
  );
}

export default Login;
