/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import React, { useContext } from "react";
import { userContext } from "../App";

function Dashboard() {
  const navigate = useNavigate();
  const {userData} = useContext(userContext)
  return (
    <div className="App">
      {userData?.role === "Admin" &&
        <div>
          <Link to="/createUsers">Create Users</Link>
        </div>
      }
      <div>
        <Link to="/groups">Create Groups</Link>
      </div>
      <button
        onClick={() => {
          sessionStorage.removeItem("token");
          navigate("/");
        }}
      >
        logout
      </button>
    </div>
  );
}

export default Dashboard;
