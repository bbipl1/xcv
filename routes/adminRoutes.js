const express=require("express");
const addNewUser = require("../controllers/officialUsers/admin/addUserControllers");


const router=express.Router();
router.post("/add-new-user",addNewUser)
module.exports=router;