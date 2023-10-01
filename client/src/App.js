import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/login";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./components/dashboard";
import axios from "axios";
import Protected from "./protectedRoute";
import CreateUsers from "./components/createUsers";
import AdminProtected from "./adminProtected";
import Groups from "./components/groups";
import GetGroups from "./components/getGroup";

export const userContext = createContext(null);

export default function App() {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    let token = sessionStorage.getItem("token");
    const headers = {
      authorization: token,
    };
    const url = "http://localhost:4001/getUserDetails";
    const data = {
      url: url,
      method: "GET",
      headers: headers,
    };
    if (token !== null) {
      try {
        const response = await axios(data);
        if (response?.status) {
          setUserData(response?.data?.data);
        } else {
          console.log(response?.error);
          sessionStorage.removeItem('token')
        }
      } catch (error) {
        alert(error?.response?.data?.error);
        sessionStorage.removeItem('token')
      }
    }else{
      setUserData(null)
    }
  };

  console.log("userData==", userData);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <userContext.Provider
      value={{ userData: userData, getUserData: getUserData }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route
            path="/dashboard"
            element={
              <Protected isLoggedIn={userData !== null}>
                <Dashboard />
              </Protected>
            }
          ></Route>
          <Route
            path="/createUsers"
            element={
              <AdminProtected isLoggedIn={userData?.role === "Admin"}>
                <CreateUsers />
              </AdminProtected>
            }
          ></Route>
          <Route
            path="/groups"
            element={
              <Protected isLoggedIn={userData !== null}>
                <Groups />
              </Protected>
            }
          ></Route>
          <Route
            path="/group/:id"
            element={
              <Protected isLoggedIn={userData !== null}>
                <GetGroups />
              </Protected>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}
