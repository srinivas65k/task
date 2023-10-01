/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "../App.css";
import React, { useContext, useState } from "react";
import { userContext } from "../App";

function CreateUsers() {
  const [signupForm, setSignUpForm] = useState();
  const { userData } = useContext(userContext);

  const onSignUpFormChange = (event) => {
    setSignUpForm({
      ...signupForm,
      [event.target.name]: event.target.value,
    });
  };

  const signUp = async () => {
    const url = "http://localhost:4001/createUser";
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "POST",
      data: signupForm,
      headers: headers,
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

  return (
    <>
      {userData?.role === "Admin" && (
        <React.Fragment>
          <h3>Create User</h3>
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
    </>
  );
}

export default CreateUsers;
