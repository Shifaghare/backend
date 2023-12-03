import { Router } from "express";
import { addCart, deleteCart, getCart } from "../Controllers/User.controllers.js";


const router = Router()

router.post("/cart",addCart)
router.post("/getcart",getCart)
router.post('/deletecart',deleteCart)


export default router