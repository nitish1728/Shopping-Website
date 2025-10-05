const express=require('express');
const router=express.Router();
const verifyJWT=require('../middleware/verifyJWT')
const verifyRoles=require('../middleware/verifyRoles')
const ROLES=require('../config/userRoles')
const {fetchCartController,updateCartController,fetchbyIDCartController,updateCartcountController}=require('../controllers/cartController')

router.get('/fetch',verifyJWT,verifyRoles(ROLES.USER),fetchCartController)
router.get('/fetch/:id',verifyJWT,verifyRoles(ROLES.USER),fetchbyIDCartController)
router.put('/update/:id',verifyJWT,verifyRoles(ROLES.USER),updateCartController)
router.put('/update/count/:id',verifyJWT,verifyRoles(ROLES.USER),updateCartcountController)

module.exports=router