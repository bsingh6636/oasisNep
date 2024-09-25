import mongoose from "mongoose";
import { MONGO_URI } from "./import.js";

export const dbconnection = () =>{
    mongoose.connect(MONGO_URI,{
        dbName: "Pagee"
    }).then(()=>{
        console.log("Sucessfully Connected  to database ")
    }).catch((err)=>{
        console.log("Failed to connect to db",err)
    })
}