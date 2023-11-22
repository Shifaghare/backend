import express from 'express';
import { Hello } from "./Controllers/GlobalControllers.js";
import router from "./Routes/index.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import morgan from 'morgan'
import cors from "cors";
        
const app= express();
dotenv.config()
app.use(morgan('dev'))
app.use(cors());
app.use(express.json());


app.use((req,res,next)=>{
    console.log('hii from middleware')
    next();

})
app.get('/',(req,res)=>{
    res.send("welcome to awdiz")
})



app.use('/api/v1',router)
mongoose.connect(process.env.MONGOURL).then(()=> console.log("Database connected."))
app.get("/fromcontrollerr" ,Hello)

app.listen(8000,()=> console.log("app is running on 8000 port"))



