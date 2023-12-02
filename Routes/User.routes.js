import { Router } from "express";
import { addCart } from "../Controllers/User.controllers.js";

const router = Router();

router.post('/addcart', addCart)


export default router;