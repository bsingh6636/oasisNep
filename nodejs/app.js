import cors from 'cors'
import express from "express"
import priceRouter from "./Router/prices.router.js"
import adminRouter from "./Router/admin.router.js"
import userRouter from "./Router/user.router.js"
import cookieParser from "cookie-parser";
import router from "./Router/router.js"
// import router from './Router/router.js'
import http from 'http'
import initializeSocket from './utils/socket.js'
const app = express()

app.use(cookieParser())

app.use(cors({
    origin: ['https://subscriptionnepal.shop', 'https://pagee-kappa.vercel.app','http://localhost:3000', 'http://localhost:3001'],
    credentials: true
}));
app.use(express.json())
app.use("/api/prices", priceRouter)
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter);
app.use('/api', router )


// Catch-all route for undefined routes


app.use('/api/check' , ( req , res , next ) => {
    res.status(200).json({ message: "success" })
})


app.use((err, req, res, next) => {
    if(err){
        // console.error(err); 
        console.log('error')
        res.status(500).json({ message: 'Something went wrong.' });
    }
   
});

app.use((req, res, next) => {
    res.status(404).json({ success : false , message: 'Route not found' });
})

const server = http.createServer(app);
initializeSocket(server);
export default server;