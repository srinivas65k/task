const { ErrorCodes, success, failure } = require("../../libs/response-libs");
const dbQueries = require("../../database/dbQueries");
const config = require("../../config.json");

async function main(req) {
  try {
    const body = req.body;
    const query = req.query;
    if (body && body.messageId && body.messageId !== "") {
      let filter = {
        _id: body.messageId,
      };
      let item = {};
      if (body.like) {
        item = { $inc: { likes: 1 }, $push : {likedUsers : query.userId} };
      } else {
        item = { $inc: { likes: -1 }, $pull : {likedUsers : query.userId} };
      }
      const isInserted = await dbQueries.update(
        config.messagesTableName,
        filter,
        item
      );
      console.log("....................:)", isInserted);
      if (isInserted) {
        return success({ status: true, data: body.like ? "Liked the message" : "Unliked the message" });
      } else {
        return failure(ErrorCodes.BAD_REQUEST, {
          status: false,
          error: "failed to semd",
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
