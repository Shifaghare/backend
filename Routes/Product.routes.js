import {Router} from "express"
import {  addProduct,  getAllProducts, getFilteredResults, getPageResults, getSingleProduct, getSortedResults,  updateProduct,  yourProducts } from "../Controllers/Products.controllers.js";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";

const router =Router(); 

router.post('/addproduct',checkUserId,addProduct)
router.get("/getallproducts", getAllProducts);
router.get("/getsingleproduct", getSingleProduct);
router.get("/getpageresults", getPageResults);
router.get("/getsortedresults", getSortedResults);
router.get("/getfilteredresults", getFilteredResults);
router.post("/yourproducts",yourProducts)
router.post("/updateproduct",updateProduct)


export default router;