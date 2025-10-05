const express=require('express')
const User=require('../model/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const loginController=async(req,res)=>{
    try{
        console.log(req.body)
        const {user,pass}=req.body
        if(!user?.trim()||!pass?.trim()){
            return res.status(400).json({"message":"Please enter username and password"})
        }
        const validUser=await User.findOne({user:user}).exec()
        if(!validUser){
            return res.status(401).json({"message":"Username not exists"})
        }
        const match=await bcrypt.compare(pass,validUser.password)
        if(!match){
            return res.status(404).json({"message":"Please enter valid password"})
        }
        const accessToken=jwt.sign(
            {
                UserInfo:{
                    user:validUser.user,
                    gmail:validUser.gmail,
                    roles:validUser.roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'15m'}
        )
        const refreshToken=jwt.sign(
            {
                UserInfo:{
                    user:validUser.user,
                    gmail:validUser.gmail,
                    roles:validUser.roles
                }
            },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        validUser.refreshToken=refreshToken
        await validUser.save()
        res.cookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000})
        res.status(200).json({accessToken})
    }
    catch(error){
        return res.status(500).json({"message":"Unable to log in user"})
    }
}

module.exports=loginController