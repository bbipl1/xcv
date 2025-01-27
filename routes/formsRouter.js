const express=require('express');
const router=express.Router();
const submitForm=require('../controllers/forms/formSubmitControllers');
const getAllForms = require('../controllers/formsGetRequirementsFormsControllers');
const updatePaymentStatusByObjectId = require('../controllers/forms/updateRequirement');
router.post("/submit-form",submitForm)
router.get("/get-requirements-forms",getAllForms)
router.put("/update-requirements-forms",updatePaymentStatusByObjectId)

module.exports=router;