const {ErrorCodes, success, failure} = require('../../libs/response-libs');
const dbQueries = require('../../database/dbQueries')
const config = require('../../config.json')

async function main(req){
    try{
        const body = req.body
        if(body && body.email && body.email !== ""){
            const exist = await dbQueries.findOne(config.usersTableName, {email:body.email})
            if(exist){
                return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "User Already Exist"})
            }
            body['role'] = 'Admin';
            const isInserted = await dbQueries.create(config.usersTableName, body)
            console.log("....................:)", isInserted)
            if(isInserted){
                return success({status:true, data:"Created Successfully"})
            }else{
                return failure(ErrorCodes.BAD_REQUEST, {status:false, error: "Invalid user"})
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