import UserModal from "../Modals/User.modal.js";
import bcrypt from 'bcrypt'
import Jwt  from "jsonwebtoken";

export const Login = async (req, res) => {
    // res.send("Hello from login")
    try{
        const {email , password} = req.body.userData;
        if(!email || !password) return res.status(401).json({success : false , message : "All Fields are mandatory"})
        const user = await UserModal.findOne({email : email})
        console.log(user, "User")
        if(!user) return res.status(401).json({success : false , message : "Email Not Found"})
        const isPasswordCorrect = await bcrypt.compare(password , user.password)
        console.log(isPasswordCorrect , "check here");
        if(!isPasswordCorrect){
            return res.status(401).json({success : false ,message : "Password not matched"})
        }
        //generate token
        const token = await Jwt.sign({id : user._id}, process.env.JWT_SECRET); 
        // console.log(token , "Token")
        return res.status(200).json({success : true , message : "Login Successful", user : {name : user.name , id : user._id},token});
    }catch(error){
        console.log(error)

        return res.status(500).json({success : false , message : error})
        
    }
}




export const Register = async (req, res) => {
    try {
        // console.log("inside register", req.body)
        const { name, email, password } = req.body.userData;
        if (!name || !email || !password ) return res.status(401).json({ success: false, message: "Please fill all the fields" })
        
        const hashedPassword=await bcrypt.hash(password,10)

        // console.log(hashedPassword,"hashedpassword ")
        const user = new UserModal({
            name: name,
            email: email,
            password: hashedPassword,
            
        })
        await user.save();

        return res.status(200).json({ success: true, message: "Registration successful" })
    }
    catch (error) {
        console.log(error,"error here")
        return res.status(500).json({ success: false, message: error })
    }
}


export const getCurrentUser= async (req,res)=>{
    try{
        const {token}=req.body;
        if(!token) return res.status(401).json({success:false , message :"Token is required"})
        const {id}=await Jwt.verify(token,process.env.JWT_SECRET)
        const user =await UserModal.findById(id);
        if (!user) return res.status(401).json({success:false ,message:"user not found"}) 

        return res.status(200).json({success : true,user : {name :user.name , id:user._id}})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({success : false , message : 'error over here'})
    }
}








