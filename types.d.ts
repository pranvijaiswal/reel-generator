import { Connection } from "mongoose"
declare global {
    var mongoose:{
        conn : Connection | null; //datatype is string
        promise : Promise<Connection> | null; //use to create database connections if there reuse it if any
        //  other promise is working then use it if null then create new
    }
}

export {};