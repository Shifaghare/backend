import { Router } from "express"
import { Login, Register, getCurrentUser } from "./../Controllers/Auth.controller.js";

const router = Router();

// router.get("/login",Login)
router.post("/login", Login)
router.post("/register", Register)
router.post("/getcurrentuser",getCurrentUser)

export default router;
