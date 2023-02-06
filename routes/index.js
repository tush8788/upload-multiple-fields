const express=require('express');
const router=express.Router();
const homeController=require('../controller/home_controller.js');

router.get('/',homeController.home);
router.post('/file/upload',homeController.uploadFile);

module.exports=router;