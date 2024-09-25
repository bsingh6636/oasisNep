import cors from 'cors'
import express from "express"
import { dbconnection } from "./dbConnection.js";
import priceRouter from "./Router/prices.router.js"
import userRouter from "./Router/userInfo.router.js"
import adminRouter from "./Router/admin.router.js"
import cookieParser from "cookie-parser";
const app = express()

app.use(cookieParser())

app.use(cors({
    origin: ['http://localhost:3000', 'https://www.ottnp.xyz'],
    credentials: true
}));
app.use(express.json())
app.use("/api", priceRouter)
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)

dbconnection()
export default app;