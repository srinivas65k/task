/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "../App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Groups() {
  const [groupsForm, setgroupsForm] = useState("");
  const [groupList, setGroupList] = useState([]);


  const ongroupsFormChange = (event) => {
    setgroupsForm(event.target.value);
  };

  const groups = async (e) => {
    e.preventDefault();
    const url = "http://localhost:4001/createGroup";
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "POST",
      data: { groupName: groupsForm },
      headers: headers,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform groups", response);
      if (response?.status) {
        alert("Group created succesfully");
        setgroupsForm("");
        getGroupsList();
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  const getGroupsList = async () => {
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const url = "http://localhost:4001/getGroups?id=true";
    const data = {
      url: url,
      method: "GET",
      headers: headers,
    };
    if (token !== null) {
      try {
        const response = await axios(data);
        if (response?.status) {
          setGroupList(response?.data?.data);
        } else {
          console.log(response?.error);
        }
      } catch (error) {
        alert(error?.response?.data?.error);
      }
    }
  };

  const deleteGroup = async (id) => {
    
    const url = `http://localhost:4001/deleteGroup/${id}`;
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "DELETE",
      headers: headers,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform groups", response);
      if (response?.status) {
        alert("Group Deleted succesfully");
        getGroupsList();
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  }

  useEffect(() => {
    getGroupsList();
  }, []);

  return (
    <>
      <React.Fragment>
        <h3>Create Group</h3>
        <form onSubmit={groups}>
          <div>
            <label htmlFor="groupName">Full Name</label>
            <input
              id="groupName"
              name="groupName"
              onChange={ongroupsFormChange}
              value={groupsForm}
              required
            />
          </div>
          <div>
            <button type="submit">Sumbit</button>
          </div>
        </form>
      </React.Fragment>
      <h2>List of Groups</h2>
      {groupList.map((item) => (
        <div>
          <h3>{item?.groupName}</h3>
          <Link to={"/group/" + item.groupId}>View Group</Link>
          <button onClick={(() => {deleteGroup(item.groupId)})}>deleteGroup</button>
        </div>
      ))}
    </>
  );
}

export default Groups;
