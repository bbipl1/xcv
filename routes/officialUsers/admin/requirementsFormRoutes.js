const express=require("express");
const updateReqFormStatusControllers = require("../../../controllers/officialUsers/admin/requirementsForm/UpdateReqFormStatusControllers");
const router=express.Router();
router.put("/update-requirements-form-status",updateReqFormStatusControllers);
module.exports=router;