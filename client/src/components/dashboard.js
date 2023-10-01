/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import React from "react";

function Dashboard() {
  const navigate = useNavigate()
  return (
    <div className="App">
      <div>
        <Link to="/createUsers">Create Users</Link>
      </div>
      <div>
        <Link to="/groups">Create Groups</Link>
      </div>
      <button onClick={(() => {sessionStorage.removeItem('token');navigate('/')})}>logout</button>
    </div>
  );
}

export default Dashboard;
