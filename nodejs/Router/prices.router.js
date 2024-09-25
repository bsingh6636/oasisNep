import express from "express"
import { addprice, deletePrice, getAllPrices, updatePrice } from "../controller/prices.controller.js"

let router = express.Router()
router.post("/prices/addNewPrice",addprice)
router.get("/getAllPrices",getAllPrices)
router.post("/updatePrice",updatePrice)
router.delete("/deletePrice",deletePrice)
export default router