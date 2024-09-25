import express from "express"
import { deleteUserIp, getAllUserIp, saveUserIp } from "../controller/userInfo.controller.js";
// import { testFunction } from "../controller/test.Contoller.js";
let router = express.Router();
router.post("/userInfo",saveUserIp)
router.get("/getAllUserDetails", getAllUserIp)
router.delete("/deleteIp", deleteUserIp)
// router.post("/test",testFunction)
export default router;