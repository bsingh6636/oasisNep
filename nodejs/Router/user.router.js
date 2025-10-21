
import express from "express";
import { register, login, getUser } from "../controller/User.controller.js";
import { Auth } from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.post('/signup', register);
router.post('/signin', login);
router.get('/auth', Auth, getUser);

export default router;
