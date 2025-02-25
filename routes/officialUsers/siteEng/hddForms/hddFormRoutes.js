const express=require("express");
const deleteHddForm = require("../../../../controllers/officialUsers/admin/siteEng/deleteSiteEngControllers");
const router=express.Router();

router.delete("/delete-form",deleteHddForm)
module.exports=router;