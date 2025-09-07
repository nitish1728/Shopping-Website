const express=require('express')
const bcrypt=require('bcrypt')
const User=require('../model/User')

const registerController=async(req,res)=>{
    try{
        const {user,gmail,pass}=req.body
        if(!user||!gmail||!pass){
            return res.status(400).json("Username and password are required")
        }
        const encryptedPassword=await bcrypt.hash(pass,10)
        const timestamp=Date.now()
        const random = Math.floor(1000 + Math.random() * 9000)
        const userID=`UID${timestamp}${random}`
        const newUser=new User ({
            id:userID,
            user:user,
            gmail:gmail,
            password:encryptedPassword
        })
        await newUser.save()
        console.log(`${user} successfully created`)
        res.status(201).json({"message":"User successfully created"})
    }
    catch(error){
        res.status(500).json({"message":error.message})
    }

}

module.exports=registerController