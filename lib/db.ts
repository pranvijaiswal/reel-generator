import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!; // states that the conn is from mongodb
if(!MONGODB_URL){
    throw new Error("Please define mongodb url in new file");
}
let cached = global.mongoose; // if no conn object there
if(!cached)
{
    cached = global.mongoose = {conn :null, promise : null}; // to make new object
}

export async function connectToDatabase() {
    if(cached.conn){
        return cached.conn; //If a connection already exists (cached.conn)
        // , return it immediately to avoid reconnecting.
    }
    if(!cached.promise){
       const opts ={
        bufferCommands : true, // buffer model func calls internally without 
        // taking use of mongoose to connect mongodb
        //Mongoose will buffer commands when the connection is down and replay them when the connection is not yet established.This means that you don't have to wait for the connection to be established to 
        // start using your models.
        
        maxpoolsize:10  // noSSR. of sockets mongodb will keep 
       }
    
    cached.promise = mongoose
    .connect(MONGODB_URL,opts)
    .then(()=> mongoose.connection)
    }
    try {
        cached.conn = await cached.promise
    } catch (error) {
        cached.promise =null
        throw error
    }
    return cached.conn;
}