const {ErrorCodes, success, failure} = require('../../libs/response-libs');
const dbQueries = require('../../database/dbQueries')
const config = require('../../config.json');

async function main(req){
    try{
        const params = req.params
        // console.log("params", params)
        // return
        if(params && params.id && params.id !== ""){
            const deleteGroup = await dbQueries.deleteOne(config.groupsTableName, {_id:params.id})
            await dbQueries.deleteMany(config.userGroupsTableName, {groupId:params.id})
            await dbQueries.deleteMany(config.messagesTableName, {groupId:params.id})
            if(deleteGroup){
                return success({status:true, data:"Group Deleted Successfully"})
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