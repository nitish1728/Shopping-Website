const User=require('../model/User')
const jwt=require('jsonwebtoken')
const refreshController=async(req,res)=>{
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
        jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,(err,decoded)=>{
            if(err) return res.status(403).json({"message":"Unauthorized"})
            const accessToken=jwt.sign(
                {UserInfo:{
                    user:decoded.UserInfo.user,
                    gmail:decoded.UserInfo.gmail,
                    roles:decoded.UserInfo.roles
                }},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn:'15m'}
            )
            res.json({accessToken})

        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({"message":"token error or expired"})
    }


}

module.exports=refreshController