const express=require("express");
const submitWaterDetailsController = require("../../../../controllers/siteEngineer/managements/waterManagementController");
const getWaterDetails = require("../../../../controllers/siteEngineer/managements/getWaterDetailsControllers");
const router=express.Router();

router.post("/submit-water-details",submitWaterDetailsController);
router.get("/get-water-details",getWaterDetails);

module.exports=router;