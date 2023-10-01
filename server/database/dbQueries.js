const connectToDatabase = require("./database");
const models = require("mongoose").models;

async function create(tableName, data, options = null){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.create(data);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function createMany(tableName, data, options = null){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.insertMany(data);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function update(tableName, filter, update, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.findOneAndUpdate(filter, update, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function updateMany(tableName, filter, update, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.updateMany(filter, update, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function findOne(tableName, filter, projection = {}, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.findOne(filter, projection, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function find(tableName, filter, projection = {}, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.find(filter, projection, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function deleteOne(tableName, filter, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.deleteOne(filter, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function deleteMany(tableName, filter, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.deleteMany(filter, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function aggregate(tableName, pipeline, options = {}){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.aggregate(pipeline, options);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function count(tableName, filter){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.count(filter);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function distinct(tableName, field, condition, callback){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.distinct(field, condition, callback);
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

async function remove(tableName){
    return new Promise(async (resolve, reject) => {
        try{
            await connectToDatabase();
            if(!models[tableName]) throw new Error("Model not found");
            const model = models[tableName];
            const result = await model.remove();
            resolve(result);            
        } catch (error) {
            reject(error)
        }
    });
}

module.exports = {
    create,
    createMany,
    update,
    updateMany,
    findOne,
    find,
    deleteOne,
    deleteMany,
    aggregate,
    count,
    distinct,
    remove
}