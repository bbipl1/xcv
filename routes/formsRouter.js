const express=require('express');
const router=express.Router();
const submitRequirementsForm=require('../controllers/forms/requirementFormSubmitControllers');
const getAllForms = require('../controllers/formsGetRequirementsFormsControllers');
const updatePaymentStatusByObjectId = require('../controllers/forms/updateRequirement');
router.post("/submit-requirements-form",submitRequirementsForm)
router.get("/get-requirements-forms",getAllForms)
router.put("/update-requirements-forms",updatePaymentStatusByObjectId)

module.exports=router;