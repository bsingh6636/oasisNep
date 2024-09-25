import mongoose from "mongoose";

const UserIpSchema = new mongoose.Schema({
    userIpDetails: {
        required: true,
        type: Object
    },
    userIpAdress: {
        type: String,
    },
    NumberOfTimes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

export const UserIp = mongoose.model("UserIp", UserIpSchema)

const PageVisitedSchema = new mongoose.Schema({
    numberOfTimesPageVisisted : {
        type : Number ,
        default : 0
    }
 } , {timestamps : true})

 export const PageVisited = mongoose.model("PageVisisted" , PageVisitedSchema)