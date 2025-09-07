const express=require('express')
const router=express.Router()

const Product=require('../controllers/ProductController')

router.get('/fetch',Product.fetchProductsController)
router.get('/fetch/:id',Product.fetchbyIDProductsController)

module.exports=router