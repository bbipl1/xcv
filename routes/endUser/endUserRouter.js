const express=require("express");
const createNewEndUser = require("../../controllers/endUser/createNewEndUser");
const router=express.Router();


router.post("/create-new-end-user",createNewEndUser);

module.exports=router;