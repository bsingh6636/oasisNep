import "./dotenv.js";

import server from "./app.js";
import { PORT } from "./import.js";
import { dbconnection } from "./dbConnection.js";

dbconnection().then(()=>{
    console.log('Connection to database');
    server.listen(PORT,()=>{
        console.log(`server listening on PORT ${PORT}`)
    })
}).catch(error=> console.log(error) )