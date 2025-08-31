const express=require('express')
const router=express.Router()
const multer=require('multer')
const Product=require('../controllers/ProductController')

const storage = multer.diskStorage({});
const upload = multer({ storage });

router.post('/add',upload.single('image'),Product.addProductController)
router.get('/fetch',Product.fetchProductsController)
router.delete('/delete/:id',Product.deleteProductsController)
router.put('/update/:id',Product.updateProductsController)

module.exports=router