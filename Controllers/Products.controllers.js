import ProductModal from "../Modals/Product.modal.js"



     export const getAllProducts = async (req, res) => {
        try{
            const products = await ProductModal.find({}).limit(10 ).select("-createdAt -updatedAt -__v")
            if(products.length){
                res.status(200).json({success : true , message : "Products Found." , products})
            }
            else{
                res.status(404).json({sucess : false , message : "product Not Found!"})
            }
        }catch(error){
            
        }
}


export const getSingleProduct = async (req, res) => {
    try{
        const {id} = req.body;
        if(!id) return res.status(401).json({success:false, message:"No product ID provided"});

        const product = await ProductModal.findById({_id:id});
        if(!product) return res.status(401).json({success:false, message:"Product not found"});

        return res.status(200).json({success:true, product:product});
    } catch(error){
        return res.status(500).json({success:false, message:error})
    }
    
}
    export const addProduct = async (req,res) => {
        try{
                 const {name, price, category, image, id} = req.body;
     
                 if(!name || !price || !category || !image || !id) return res.status(401).json({success: false, message:"All fields are mandatory"});
             
                 const product = new ProductModal({
                     name,
                     price,
                     category,
                     image,
                     id
                 })
             
                 await product.save();
             
                 return res.status(201).json({success:true, message:"Added New Product"});
     
        } catch(error){
             console.log(error.message);
             return res.status(500).json({success:false, message: error});
        }
     
     }
     
     export const getPageResults = async (req, res) => {
         try{
             const {page} = req.body;
             if(!page) return res.status(401).json({success:false, message:"Page number required"});
     
             const products = await ProductModal.find({}).skip(page*3).limit(3);
             if(!products) return res.status(401).json({success:false, message:"No products found"});
     
             return res.status(200).json({success:true, products:products})
     
         } catch(error){
             return res.status(500).json({success:false, message:error})
         }
     }
     
     export const getSortedResults = async (req,res) => {
         try{
             const {sortType} = req.body;
             if(!sortType) return res.status(401).json({success:false, message:"Sort type required"});
     
             const products = await ProductModal.find({}).sort({price:sortType});
             if(products.length === 0) return res.status(401).json({success:false, message:"No products found"})
     
             return res.status(200).json({success:true, products:products});
         } catch(error){
             return res.status(500).json({success:false, message:error}); 
         }
     }
     
     export const getFilteredResults = async (req,res) => {
         try{
             const {filterValue} = req.body;
             if(!filterValue) return res.status(401).json({success:false, message:"Filter value is required"});
     
             const products = await ProductModal.find({category:filterValue});
             if(!products) return res.status(401).json({success:false, message:"No products found"});
     
             return res.status(200).json({success:true, products:products})
     
         }catch(error){
             return res.status(500).json({success:false, message:error}); 
         }
     }