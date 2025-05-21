import express from "express"
import { addprice, deletePrice, getAllPrices, updatePrice } from "../controller/prices.controller.js"
import { Auth } from "../middleware/Auth.middleare.js"

let router = express.Router()
router.post("/",Auth , addprice)
router.get("/",getAllPrices)
router.put("/",updatePrice)
router.delete("/:Name",Auth ,deletePrice)
router.get
export default router