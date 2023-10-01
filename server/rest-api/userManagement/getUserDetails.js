const { ErrorCodes, success, failure } = require("../../libs/response-libs");
const dbQueries = require("../../database/dbQueries");
const config = require("../../config.json");

async function main(req) {
  try {
    const query = req.query;
    if (query && query.userId && query.userId !== "") {
      let payload;
      if (query.allUsers) {
        let filter = {};
        if (query.searchKey) {
          filter["$or"] = [];
          filter["$or"].push({
            fullName: { $regex: query.searchKey, $options: "i" },
          });
          filter["$or"].push({
            email: { $regex: query.searchKey, $options: "i" },
          });
        }
        payload = await dbQueries.find(config.usersTableName, filter, {
          password: 0,
        });
      } else {
        payload = await dbQueries.findOne(
          config.usersTableName,
          { _id: query.userId },
          { password: 0 }
        );
      }
      console.log("....................:)", payload);
      if (payload) {
        return success({ status: true, data: payload });
      } else {
        return failure(ErrorCodes.BAD_REQUEST, {
          status: false,
          error: "Invalid user",
        });
      }
    } else {
      return failure(ErrorCodes.BAD_REQUEST, {
        status: false,
        error: "Invalid Params",
      });
    }
  } catch (e) {
    console.log("e..............:)", e);
    return failure(ErrorCodes.ERROR, {
      status: false,
      error: "Internal Server Error",
    });
  }
}

module.exports = { main };
