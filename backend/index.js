const express=require("express");
const app=express();
const cors=require("cors");
const mongoose=require("mongoose");
app.use(express.json());
require("dotenv").config();


const userRoute=require('./routes/user');


mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("connected to mongodb");
});

app.listen(3001,()=>{
    console.log("backend server is started");
})

app.use("/api/user",userRoute);