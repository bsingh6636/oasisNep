import cors from 'cors'
import express from "express"
import priceRouter from "./Router/prices.router.js"
import userRouter from "./Router/userInfo.router.js"
import adminRouter from "./Router/admin.router.js"
import cookieParser from "cookie-parser";
import router from './Router/router.js'
const app = express()

app.use(cookieParser())

app.use(cors({
    origin: ['https://subscriptionnepal.shop', 'https://pagee-kappa.vercel.app','http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json())
app.use("/api/prices", priceRouter)
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use('/api', router  )

// Catch-all route for undefined routes


// app.use('/check' , ( req , res , next ) => {
//     throw new Error("Error by app js");
    
// })


app.use((err, req, res, next) => {
    if(err){
        // console.error(err); 
        console.log('error')
        res.status(500).json({ message: 'Something went wrong.' });
    }
   
});
export default app;