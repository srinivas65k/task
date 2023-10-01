const mongoose = require("mongoose");
const config = require("../../config.json");

const messages = new mongoose.Schema({
  message: { type: String, required: true },
  groupId: { type: mongoose.Types.ObjectId, required:true },
  likes : {type:Number, required:true},
  userName : {type:String, required:true},
  createdAt: {type: Number, required:true},
  likedUsers : {type : Array}
});

module.exports =
  mongoose.models[config.messagesTableName] ||
  mongoose.model(config.messagesTableName, messages);
