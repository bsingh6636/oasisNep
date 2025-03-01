import mongoose from "mongoose";
import { MONGO_URI } from "./import.js";

export const dbconnection = () => {
    return mongoose.connect(MONGO_URI, {
        dbName: "Pagee"
    }).then(() => {
        console.log("Successfully Connected to database");
    }).catch((err) => {
        console.log("Failed to connect to db", err);
        throw err;  // Re-throw to catch in outer block
    });
};