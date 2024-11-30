import express from "express";
const router = express.Router();
import { allUsers, userRegister } from "../controllers/userController.js";

router.get("/", allUsers);

router.post("/register", userRegister);


export default router;