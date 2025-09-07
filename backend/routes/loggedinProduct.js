const express=require('express')
const router=express.Router()
const multer=require('multer')
const Product=require('../controllers/ProductController')
const verifyJWT=require('../middleware/verifyJWT')
const verifyRoles=require('../middleware/verifyRoles')
const storage = multer.diskStorage({});
const upload = multer({ storage });
const ROLES=require('../config/userRoles')

router.post('/add',verifyJWT,verifyRoles(ROLES.ADMIN),upload.single('image'),Product.addProductController)
router.delete('/delete/:id',verifyJWT,verifyRoles(ROLES.ADMIN),Product.deleteProductsController)
router.put('/update/:id',verifyJWT,verifyRoles(ROLES.ADMIN),upload.single('image'),Product.updateProductsController)

module.exports=router