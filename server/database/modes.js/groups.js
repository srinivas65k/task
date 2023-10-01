const mongoose = require("mongoose");
const config = require("../../config.json");

const groupsSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  createdAt: { type: Number, required:true }
});

module.exports =
  mongoose.models[config.groupsTableName] ||
  mongoose.model(config.groupsTableName, groupsSchema);
