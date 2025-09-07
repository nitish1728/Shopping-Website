const User=require('../model/User')
const logoutController=async(req,res)=>{
    try{
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt
        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            res.clearCookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000})
            return res.status(403).json({"message":"Unauthorized"})
        }
        foundUser.refreshToken=""
        await foundUser.save()
        res.clearCookie('jwt',refreshToken,{httpOnly:true,maxAge: 24*60*60*1000})
        res.status(200).json({"message":`${foundUser.user} logged out successfully`})
        console.log(`${foundUser.user} logged out successfully`)
    }
    catch(error){
        console.error(error)
        return res.status(500).json({"message":error.message})
    }
}

module.exports=logoutController