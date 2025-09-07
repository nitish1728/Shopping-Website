const express=require('express');
const router=express.Router();
const fetchAuthController=require('../controllers/fetchAuthController')

router.get('/',fetchAuthController)

module.exports=router