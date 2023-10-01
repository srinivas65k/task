const {ErrorCodes, success, failure} = require('../../libs/response-libs');
const dbQueries = require('../../database/dbQueries')
const config = require('../../config.json')
const jwt = require('jsonwebtoken');

async function main(req){
    try{
        const body = req.body
        console.log("body...............:", body)
        if(body && body.email && body.email !== "" && body.password && body.password !== ""){
            const payload = await dbQueries.findOne(config.usersTableName, {email:body.email, password:body.password})
            console.log("....................:)", payload)
            if(payload){
                var token = jwt.sign({ _id: payload._id, role:payload.role }, "Rikt@m", { expiresIn: '24h' });
                return success({status:true, data:token})
            }else{
                return failure(ErrorCodes.UNAUTHORIZED, {status:false, error: "Invalid user"})
            }
        }else{
            return failure(ErrorCodes.UNAUTHORIZED, {status:false, error: "Invalid Params"})
        }
    }catch(e){
        console.log("e..............:)", e)
        return failure(ErrorCodes.ERROR, {status:false, error: "Internal Server Error"})
    }
}

module.exports = {main}