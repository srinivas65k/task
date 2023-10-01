const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
let isConnected;
require("./modes.js");
const config = require("../config.json");

module.exports = connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  mongoose.set('strictQuery', false);
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
  return await mongoose.connect(config.mongoUrl, options).then(db => { 
    console.log("connected to database")
      isConnected = db.connections[0].readyState;
    }).catch(err => console.log(err));;
};
