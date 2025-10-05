const User=require('../model/User')
const Product=require('../model/product')
const { Types } = require('mongoose');

const fetchCartController= async(req,res)=>{
    try{
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt
        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.status(401).json({"message":"Unathorized"})
        }
        if(!foundUser.cart.length){
            return res.status(200).json({cart:[]})
        }

        const cartProducts=await User.findOne({refreshToken:refreshToken}).populate("cart.product").exec()
        res.status(200).json({cartProducts})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({"message":"Try to access cart page after some time"})
    }
}
const fetchbyIDCartController=async(req,res)=>{
    try{
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt
        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.status(401).json({"message":"Unauthorized"})
        }

        const id=req.params.id
        const foundProduct=foundUser.cart.find(each=>each.product.toString()===id.toString())
        if(foundProduct==undefined){
            res.status(200).json({quantity:0})
        }
        else{
            res.status(200).json(foundProduct)
        }
        
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({"message":"Error on fetching cart products"})
    }
}
const updateCartController= async(req,res)=>{
    try{
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt

        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.status(401).json({"message":"Unathorized"})
        }

        const id=req.params.id

        await User.updateOne({id:foundUser.id},{$push:{cart:{product:id,quantity:1}}})
        console.log(`Product ${id} added to cart`)
    }
    catch(error){
        console.error(error.message)
        res.status(500).json({"message":"Error on updating cart products"})
    }
}

const updateCartcountController=async(req,res)=>{
    try{
        const cookie=req.cookies;
        const count=Number(req.body.count);

        const id=String(req.params.id);

        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt

        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.status(401).json({"message":"Unathorized"})
        }

        await User.updateOne(
            { id: foundUser.id, "cart.product":id },
            { $inc: { "cart.$.quantity": count } }
        );

    }
    catch(error){
        console.error(error.message)
        res.status(500).json({"message":"Error on updating cart products"})
    }
}

module.exports={fetchCartController,updateCartController,fetchbyIDCartController,updateCartcountController}