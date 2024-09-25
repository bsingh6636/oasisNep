import app from "./app.js"
import { PORT } from "./import.js"


app.listen(PORT,()=>{
    console.log(`server listening on PORT ${PORT}`)
})
