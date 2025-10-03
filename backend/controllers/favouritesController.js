const User=require('../model/User')
const Product=require('../model/product')

const fetchfavouritesController=async(req,res)=>{
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
        //since favourites  are empty, sending empty array
        if(!foundUser.favourites.length){
            return res.status(200).json({favourites: [] })
        }
        
        const favouriteProducts=await User.findOne({refreshToken:refreshToken}).populate("favourites").exec()
        res.status(200).json(favouriteProducts)
    }
    catch(error){
        console.error(error)
        res.status(500).json({"message":"Try to connect favourites page after some time"})
    }
}

const updateFavouritesController=async(req,res)=>{
    try{
        const id=req.params.id;
        const cookie=req.cookies
        if(!cookie?.jwt){
            return res.status(204).json({"message":"No content"})
        }
        const refreshToken=cookie.jwt
        const foundUser=await User.findOne({refreshToken:refreshToken}).exec()
        if(!foundUser){
            return res.status(401).json({"message":"Unauthorized"})
        }
        if(foundUser.favourites.includes(id)){
            console.log(id)
            await User.updateOne({ refreshToken:foundUser.refreshToken },{ $pull: { favourites: id } });
        }
        else{
            await User.updateOne({ refreshToken:foundUser.refreshToken },{ $addToSet: { favourites: id } });
        }

        const updatedUser= await User.findOne({ refreshToken:foundUser.refreshToken }).exec();
        console.log(updatedUser.favourites)
        const favouriteProducts = await Product.find({_id: { $in: updatedUser.favourites } }).exec();   
        res.status(200).json(favouriteProducts)

    }
    catch(error){
        console.error(error.message)
        res.status(500).json({"message":"Try to connect favourites page after some time"})
    }
}

module.exports={fetchfavouritesController,updateFavouritesController}