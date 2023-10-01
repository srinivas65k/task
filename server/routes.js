const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const adminSignUp = require("./rest-api/userManagement/createAdmin");
const adminCreateUser = require("./rest-api/userManagement/createUser");
const login = require("./rest-api/authentication/login");
const getUserDetails = require("./rest-api/userManagement/getUserDetails");
const createGroup = require("./rest-api/groupManagement/createGroup");
const getGroups = require("./rest-api/groupManagement/getGroups");
const createMessage = require("./rest-api/messagesManagement/createMessage");
const updateMessage = require("./rest-api/messagesManagement/updateMessage");
const getMessages = require("./rest-api/messagesManagement/getMessages");
const addMember = require("./rest-api/groupManagement/addMembersToGroup");
const deleteGroup = require("./rest-api/groupManagement/deleteGroup");


const tokenVerify = (req, res, next) => {
  let token = req.headers["authorization"];
  jwt.verify(token, "Rikt@m", (err, user) => {
    if (err) {
      console.log(err)
      return res.status(403).send({ status: false, data: "Invalid Token" });
    }
    console.log("user...........:)", user);
    req.query.userId = user._id;
    next();
  });
};

const adminTokenVerify = (req, res, next) => {
  let token = req.headers["authorization"];
  jwt.verify(token, "Rikt@m", (err, user) => {
    if (err) {
      return res.status(403).send({ status: false, data: "Invalid Token" });
    }
    if (user.role == "Admin") {
      req.query.userId = user._id;
      next();
    }else{
      return res.status(401).send({ status: false, data: "only admin can create users" });
    }
  });
};

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/adminSignUp", async (req, res) => {
  try {
    const data = await adminSignUp.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/login", async (req, res) => {
  try {
    const data = await login.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getUserDetails", tokenVerify, async (req, res) => {
  try {
    const data = await getUserDetails.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});



app.post("/createUser", adminTokenVerify, async (req, res) => {
  try {
    const data = await adminCreateUser.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/createGroup", tokenVerify, async (req, res) => {
  try {
    const data = await createGroup.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addMember", tokenVerify, async (req, res) => {
  try {
    const data = await addMember.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getGroups", tokenVerify, async (req, res) => {
  try {
    const data = await getGroups.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/getUsersInGroup", tokenVerify, async (req, res) => {
  try {
    const data = await createGroup.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});


app.post("/createMessage", tokenVerify, async (req, res) => {
  try {
    const data = await createMessage.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/updateMessage", tokenVerify, async (req, res) => {
  try {
    const data = await updateMessage.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});


app.get("/getMessages", tokenVerify, async (req, res) => {
  try {
    const data = await getMessages.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/deleteGroup/:id", tokenVerify, async (req, res) => {
  try {
    const data = await deleteGroup.main(req);
    res.status(data.statusCode).send(data.body);
  } catch (e) {
    console.log("e................:)", e);
    res.status(500).send("Internal Server Error");
  }
});



module.exports = app;
