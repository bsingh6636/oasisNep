
import express from "express";
import { register, login } from "../controller/User.controller.js";

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/signup' , (req , res) => {
    res.status(200).json({ message: "success" })
})

export default router;
