const express=require("express");
const updateSalesAmount = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateSalesAmountControllers");
const updateclientName = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateClientNameControllers");
const updateSiteName = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updateSiteNameControllers");
const deleteHddReport = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/deleteSiteEngControllers");
const updatePaymentReceivedFromClientControllers = require("../../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/updatePaymentReceivedFromClientControllers");
const router=express.Router();
router.put("/update-payment-received-from-bbipl",updateSalesAmount);
router.put("/update-client-name",updateclientName);
router.put("/update-amount-received-from-client",updatePaymentReceivedFromClientControllers);
router.put("/update-site-name",updateSiteName);
router.delete("/delete-report",deleteHddReport)
module.exports=router;