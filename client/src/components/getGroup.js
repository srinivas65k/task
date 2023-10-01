/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import "../App.css";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../App";
import { useParams } from "react-router-dom";

function GetGroups() {
  const [groupsForm, setgroupsForm] = useState("");
  const { userData } = useContext(userContext);
  const [usersList, setUsersList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [message, setMessage] = useState("");
  const [group, setGroup] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  let usersArray = [];

  const params = useParams();

  console.log("params==", params);

  const addMembersToGroup = async (item) => {
    let grp = {
      groupName: group[0].groupName,
      userId: item._id,
      groupId: params.id,
      userName: item.fullName,
    };
    // console.log("itemm==", item)
    // console.log("grp==", grp)
    // return
    const url = "http://localhost:4001/addMember";
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "POST",
      data: grp,
      headers: headers,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform groups", response);
      if (response?.status) {
        alert("User added succesfully");
        getGroupsDetails();
        getUsers();
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  const getUsers = async () => {
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    let query = "?allUsers=true";
    if (searchKey !== "") query += `&searchKey=${searchKey}`;
    const url = "http://localhost:4001/getUserDetails" + query;
    const data = {
      url: url,
      method: "GET",
      headers: headers,
    };
    if (token !== null) {
      try {
        const response = await axios(data);
        if (response?.status) {
          const filteredUsers = response?.data?.data.filter((user) => {
            if (!usersArray.includes(user._id)) {
              return user;
            }
          });
          setUsersList(filteredUsers);
        } else {
          console.log(response?.error);
        }
      } catch (error) {
        alert(error?.response?.data?.error);
      }
    }
  };

  const getGroupsDetails = async () => {
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    let query = `?groupId=${params?.id}`;
    const url = "http://localhost:4001/getGroups" + query;
    const data = {
      url: url,
      method: "GET",
      headers: headers,
    };
    if (token !== null) {
      try {
        const response = await axios(data);
        if (response?.status) {
          setGroup(response?.data?.data);
          usersArray = [];
          response?.data?.data?.map((user) => {
            usersArray.push(user?.userId);
          });
        } else {
          console.log(response?.error);
        }
      } catch (error) {
        alert(error?.response?.data?.error);
      }
    }
  };

  const getMessages = async () => {
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    let query = `?groupId=${params?.id}`;
    const url = "http://localhost:4001/getMessages" + query;
    const data = {
      url: url,
      method: "GET",
      headers: headers,
    };
    try {
      const response = await axios(data);
      if (response?.status) {
        setMessagesList(response?.data?.data);
      } else {
        console.log(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
    }
  };

  const sendMessage = async (item) => {
    let grp = {
      groupId: params.id,
      message: message,
    };
    const url = "http://localhost:4001/createMessage";
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "POST",
      data: grp,
      headers: headers,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform groups", response);
      if (response?.status) {
        alert("Message sent succesfully");
        setMessage("");
        getMessages();
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  const updateMessage = async (message) => {
    // console.log("message", message?.likedUsers.includes(userData?._id))
    // return
    let grp = {
      messageId: message?._id,
      like: !message?.likedUsers.includes(userData?._id),
    };
    const url = "http://localhost:4001/updateMessage";
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };

    const data = {
      url: url,
      method: "PUT",
      data: grp,
      headers: headers,
    };
    try {
      const response = await axios(data);
      console.log("reposnseform groups", response);
      if (response?.status) {
        alert(
          message?.likedUsers.includes(userData?._id)
            ? "Unliked message"
            : "Liked Message"
        );
        getMessages();
      } else {
        alert(response?.error);
      }
    } catch (error) {
      alert(error?.response?.data?.error);
      console.log(error);
    }
  };

  useEffect(() => {
    getGroupsDetails();
    getUsers();
    getMessages();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p>
          Group Name : <b>{group[0]?.groupName}</b>
        </p>
        <button
          onClick={() => {
            setShowUsers(!showUsers);
          }}
        >
          Add users
        </button>
      </div>
      <React.Fragment>
        <div className="container">
          <div className="container chat chatBox">
            <div className="chat">
              <h3>Chat</h3>
              {messagesList.map((message) => (
                <>
                  {/* <p>Sent By : {message?.userName === userData?.fullName ? "Me" : message?.userName}</p> */}
                  <p>Sent By : {message?.userName}</p>
                  <p>{message?.message}</p>
                  <p>Likes : {message?.likes}</p>
                  <button
                    onClick={() => {
                      updateMessage(message);
                    }}
                  >
                    {message?.likedUsers.includes(userData?._id)
                      ? "Unlike"
                      : "Like"}
                  </button>
                </>
              ))}
              <br />
              <input
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>send</button>
            </div>

            <div style={{alignItems:"flex-end"}}>
              <h4>Users in group</h4>
              {group.map((item) => (
                <>
                  <p>{item?.userName}</p>
                </>
              ))}
            </div>
          </div>
          {showUsers && (
            <div className="users">
              <h2>List of Users</h2>
              <input
                value={searchKey}
                placeholder="search by name or email"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
              <button onClick={getUsers}>search</button>
              {usersList.map((item) => (
                <div style={{ display: "flex" }}>
                  <h3>{item?.fullName}</h3>
                  <button
                    onClick={() => {
                      addMembersToGroup(item);
                    }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    </>
  );
}

export default GetGroups;
