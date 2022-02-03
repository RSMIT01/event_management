const router =require("express").Router();
const User=require("../models/User");
const bcrypt=require("bcrypt");
const e = require("express");

router.post("/register",async (req,res)=>{
    try {
        const salt= await bcrypt.genSalt(10);
        const hashed= await bcrypt.hash(req.body.password,salt);
        const user =await User.findOne({email:req.body.email});
        if(!user)
        {
            const newUser=new User({
                username:req.body.username,
                email:req.body.email,
                password:hashed,
            })
        const user=await newUser.save();
        res.status(200).json(user);
        }
        else
        {
            res.status(400).json("already regisered pls login")
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
})
router.post("/login",async (req,res)=>{
    try{

        const user =await User.findOne({email:req.body.email});
        !user && res.status(404).json("user not found")
        const valispassword =await bcrypt.compare(req.body.password,user.password)
        !valispassword && res.status(400).json("password is wrong")

        res.status(200).json("logged in successfully")
    } catch(err){
        res.status(500).json(err)
    }
});
module.exports=router;