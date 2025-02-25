const express=require('express');
const router=express.Router();
const deleteContactus=require("../../../../controllers/admin/users/query/contactUsControllers");

router.delete("/delete-contact-us",deleteContactus);

module.exports=router;