const { ErrorCodes, success, failure } = require("../../libs/response-libs");
const dbQueries = require("../../database/dbQueries");
const config = require("../../config.json");

async function main(req) {
  try {
    const query = req.query;
    if (query && query.userId && query.userId !== "") {

    let filter = {};
      if(query.searchKey){
        filter['groupName'] = {$regex : query.searchKey ,$options : 'i'}
      }
      if(query.groupId){
        filter['groupId'] = query.groupId
      }
      if(query.id){
        filter['userId'] = query.userId
      }
      console.log("filterr==",filter)
      const payload = await dbQueries.find(config.userGroupsTableName, filter);
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
