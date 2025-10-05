const verifyRoles=(allowedRoles)=>{
    return(req,res,next)=>{
        console.log(req.roles)
        if(!req?.roles){
            return res.sendStatus(401)
        }
        if(req.roles!=allowedRoles){
            return res.sendStatus(403).json({"message":"You dont have access for this operation"})
        } 
        next()
    }  
}


module.exports=verifyRoles