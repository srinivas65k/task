const {ErrorCodes, success, failure} = require('../../libs/response-libs');
const dbQueries = require('../../database/dbQueries')
const config = require('../../config.json');

async function main(req){
    try{
        const body = req.body
        const query = req.query
        if(body && body.groupName && body.groupName !== ""){
            const exist = await dbQueries.findOne(config.groupsTableName, {groupName:body.groupName})
            const getUserDetails = await dbQueries.findOne(config.usersTableName, {_id:query.userId})
            if(exist){
                return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "Group Name Already Exist"})
            }
            body['createdAt'] = new Date().valueOf();
            const isInserted = await dbQueries.create(config.groupsTableName, body)

            let grp = {
                groupId: isInserted['_id'].toString(),
                userId: query.userId,
                groupName : body.groupName,
                userName:getUserDetails['fullName']
            }

            await dbQueries.create(config.userGroupsTableName, grp)
            console.log("....................:)", isInserted)

            if(isInserted){
                return success({status:true, data:"Created Successfully"})
            }else{
                return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "something went wrong try again"})
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