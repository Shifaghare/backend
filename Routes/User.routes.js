import { Router } from "express";
import { addCart, deleteCart, getCart } from "../Controllers/User.controllers.js";
import axios from "axios";


const router = Router()

router.post("/cart",addCart)
router.post("/getcart",getCart)
router.post('/deletecart',deleteCart)
router.get('/test',async(req,res)=>{
    try{
    const response= await axios.get('https://fakestoreapi.com/products')
    return res.status(200).json({success:true,products:response.data})
    }  
    catch(error){
        console.log(error)
        return res.status(500).json({success:false,message:error})

    }
})


export default router