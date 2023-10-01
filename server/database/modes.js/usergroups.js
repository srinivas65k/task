const mongoose = require("mongoose");
const config = require("../../config.json");

const userGroups = new mongoose.Schema({
  groupId: { type: mongoose.Types.ObjectId, required: true },
  userId: { type: mongoose.Types.ObjectId, required:true },
  groupName : {type:String, required:true},
  userName : {type:String, required:true}
});

module.exports =
  mongoose.models[config.userGroupsTableName] ||
  mongoose.model(config.userGroupsTableName, userGroups);
