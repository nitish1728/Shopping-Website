const cloudinary=require('../config/img_conn')
const Product=require('../model/product')

const addProductController= async(req,res)=>{
    try{
        const result=await cloudinary.uploader.upload(req.file.path,{
            folder:'Products'
        })
        const totalProducts=await Product.countDocuments();
        const timestamp=Date.now()
        const random = Math.floor(1000 + Math.random() * 9000)
        const productID=`PRD${timestamp}${totalProducts}${random}`
        const product=new Product({
            id: productID,
            title: req.body.title || 'Untitled',
            price: req.body.price || 0,
            description: req.body.description || 'Product Description',
            category: req.body.category,
            stock:req.body.stock,
            image:result.secure_url,
            imageId:result.public_id,
            isFavourites: false,
            isInCart:false
        })

        await product.save()
        console.log('Product successfully added')
        res.status(201).json({msg:"Product Successfully added"})
    }
    catch(err){
        res.status(500).json({error:"Something went wrong"})
    }
}

const fetchProductsController=async(req,res)=>{
    const products=await Product.find()
    if(!products) return res.status(204).json({'message':'No Products found'})
    res.json(products)
}

const deleteProductsController=async(req,res)=>{
    try{
        const id=req.params.id
        const exactProduct=await Product.findOne({id:id}).exec()
        if(!exactProduct){
            return res.status(404).json({message:"Product not found"})
        }   
        if(exactProduct.imageId){
            await cloudinary.uploader.destroy(exactProduct.imageId)
        }

        await Product.deleteOne({id:id});

        res.status(201).json({"message":"Product Deleted Successfully"})
    }
    catch(error){
        console.error("Error message",error)
        res.status(500).json({"message":"Failed to obtain Product"})
    }

}

const updateProductsController =async(req,res)=>{
    try{
        const id=req.params.id
        const exactProduct=await Product.findOne({id:id}).exec()
        if(!exactProduct){
            return res.status(404).json({message:"Product not found"})
        }
        if(req.file){
            if(exactProduct.imageId){
                await cloudinary.uploader.destroy(exactProduct.imageId)
            }
            const result= await cloudinary.uploader.upload(req.file.path,{
                "folder":'Products'
            })

            exactProduct.image(result.secure_url)
            exactProduct.imageId(result.public_id)
        }
        if(req.body.title) exactProduct.title=req.body.title
        if(req.body.price) exactProduct.price=req.body.price
        if(req.body.description) exactProduct.description=req.body.description
        if(req.body.category) exactProduct.category=req.body.category
        if(req.body.stock) exactProduct.stock=req.body.stock
        
        await exactProduct.save()
        res.status(201).json({message:"Product Updated Successfully"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Failed to Update Product. Please try again after some time"})
    }
}

module.exports={addProductController,fetchProductsController,deleteProductsController,updateProductsController}