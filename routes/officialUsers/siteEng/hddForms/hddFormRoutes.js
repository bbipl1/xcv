const express=require("express");
const deleteHddForm = require("../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/deleteSiteEngControllers");
const updatePaymentReceivedFromClient = require("../../../../controllers/siteEngineer/hddForms/updatePaymentReceivedFromClient");
const updatePaymentReceivedFromCompany = require("../../../../controllers/siteEngineer/hddForms/updatePaymentReceivedFromCompany");
const router=express.Router();

router.put("/update-payment-received-from-client",updatePaymentReceivedFromClient)
router.put("/update-payment-received-from-company",updatePaymentReceivedFromCompany)

module.exports=router;