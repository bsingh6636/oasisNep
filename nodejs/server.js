import app from "./app.js"
import { PORT } from "./import.js"
import { dbconnection } from "./dbConnection.js"

dbconnection().then(()=>{
    console.log('Connection to database');
    app.listen(PORT,()=>{
        console.log(`server listening on PORT ${PORT}`)
    })
}).catch(error=> console.log(error) )