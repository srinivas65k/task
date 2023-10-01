const {ErrorCodes, success, failure} = require('../../libs/response-libs');
const dbQueries = require('../../database/dbQueries')
const config = require('../../config.json')

async function main(req){
    try{
        const body = req.body
        const query = req.query
        if(body && body.message && body.message !== "" && body.groupId && body.groupId !== ""){
            const userDetails = await dbQueries.findOne(config.usersTableName, {_id:query.userId})
            body['createdAt'] = new Date().valueOf();
            body['groupId'] = body.groupId;
            body['likes'] = 0;
            body['userName'] = userDetails['fullName'];
            const isInserted = await dbQueries.create(config.messagesTableName, body)
            console.log("....................:)", isInserted)
            if(isInserted){
                return success({status:true, data:"Message Sent Successfully"})
            }else{
                return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "failed to semd"})
            }
        }else{
            return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "Invalid Params"})
        }
    }catch(e){
        console.log("e..............:)", e)
        return failure(ErrorCodes.ERROR, {status:false, error: "Internal Server Error"})
    }
}

module.exports = {main}