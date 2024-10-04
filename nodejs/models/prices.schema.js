import mongoose from "mongoose";


const PricesSchema = new mongoose.Schema({
    Name : {
        type:String,
        required :true,
    },
    Id :{
        type:String,
        // required:true,
    },
    ImageId:{
        type:String,
        required:true,
    },
    Category:{
        type:String,
    },
    Info:{
        type:String,
    },
    plans :{
        type:Object,
    },
    Note : {
        type : String
    } ,
    Status : {
        type : String
    } , 
    MonthlyPass : {
        type : Object 
    }
},
{ timestamps: true })

export const Prices=mongoose.model("Prices",PricesSchema)