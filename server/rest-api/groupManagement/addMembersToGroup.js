const { ErrorCodes, success, failure } = require("../../libs/response-libs");
const dbQueries = require("../../database/dbQueries");
const config = require("../../config.json");

async function main(req) {
  try {
    const body = req.body;
    if (
      body &&
      body.groupId &&
      body.groupId !== "" &&
      body.userId &&
      body.userId !== ""
    ) {
      let grp = {
        groupId: body.groupId,
        userId: body.userId,
        groupName: body.groupName,
        userName: body.userName,
      };

      const isInserted = await dbQueries.create(
        config.userGroupsTableName,
        grp
      );
      console.log("....................:)", isInserted);
      if (isInserted) {
        return success({
          status: true,
          data: "Member added succesully",
        });
      } else {
        return failure(ErrorCodes.BAD_REQUEST, {
          status: false,
          error: "please try again",
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
