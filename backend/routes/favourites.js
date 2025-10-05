const express=require('express');
const router=express.Router();
const verifyJWT=require('../middleware/verifyJWT')
const verifyRoles=require('../middleware/verifyRoles')
const ROLES=require('../config/userRoles')
const {fetchfavouritesController,updateFavouritesController}=require('../controllers/favouritesController')

router.get('/fetch',verifyJWT,verifyRoles(ROLES.USER),fetchfavouritesController)
router.patch('/update/:id',verifyJWT,verifyRoles(ROLES.USER),updateFavouritesController)


module.exports=router