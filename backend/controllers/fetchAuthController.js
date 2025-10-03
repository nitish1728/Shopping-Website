const User=require('../model/User')

const fetchAuthController=async(req,res)=>{
    try{
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.json({isLoggedIn: false, role: null,user:null,message: "Unauthorized"})
        }
        const refreshToken=cookie.jwt
        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.json({isLoggedIn: false, role: null,user:null,message: "Unauthorized"})
        }
        if(foundUser.roles===2013){
            return res.json({isLoggedIn: true, role: "Admin",user:foundUser.user,"message":"Logged in"})
        }
        else{
            return res.json({isLoggedIn: true, role: "User",user:foundUser.user,"message":"Logged in"})
        }
    }
    catch(error){
        res.status(500).json({"message":error.message})
    }
    
}

module.exports=fetchAuthController