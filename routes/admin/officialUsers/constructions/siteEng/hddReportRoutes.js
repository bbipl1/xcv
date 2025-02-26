const express=require("express");
const updateSalesAmount = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateSalesAmountControllers");
const updateclientName = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateClientNameControllers");
const updateSiteName = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateSiteNameControllers");
const router=express.Router();
router.put("/update-sales-amount",updateSalesAmount);
router.put("/update-client-name",updateclientName);
router.put("/update-site-name",updateSiteName);
module.exports=router;