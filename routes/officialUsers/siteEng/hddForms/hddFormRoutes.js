const express=require("express");
const deleteHddForm = require("../../../../controllers/admin/officialUsers/construction/siteEng/hddReport/deleteSiteEngControllers");
const updatePaymentReceivedFromClient = require("../../../../controllers/siteEngineer/hddForms/updatePaymentReceivedFromClient");
const updatePaymentReceivedFromCompany = require("../../../../controllers/siteEngineer/hddForms/updatePaymentReceivedFromCompany");
const uploadPaymentReceiptControllers = require("../../../../controllers/siteEngineer/hddForms/uploadPaymentReceiptControllers");
const uploadPaymentReceiptMW = require("../../../../middlewares/siteEng/hddUser/uploadPaymentReceiptMW");
const uploadWorkProgressPhotoOrVideoMW = require("../../../../middlewares/siteEng/hddUser/uploadWorkProgressPhotoOrVideoMW");
const uploadWorkProgressPhotoOrVideoControllers = require("../../../../controllers/siteEngineer/hddForms/uploadWorkProgressPhotoOrVideoControllers");

const router=express.Router();

router.put("/update-payment-received-from-client",updatePaymentReceivedFromClient)
router.put("/update-payment-received-from-company",updatePaymentReceivedFromCompany)
router.put("/update-payment-receipt",uploadPaymentReceiptMW,uploadPaymentReceiptControllers)
router.put("/update-Work-progress-photo-or-video",uploadWorkProgressPhotoOrVideoMW,uploadWorkProgressPhotoOrVideoControllers)

module.exports=router;