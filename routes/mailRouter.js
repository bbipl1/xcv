const express = require('express');
const router = express.Router();
// const { uploadFile,userFileUpload } = require('../controllers/userFileUploadControllers.js');
const {sendEmail}=require('../controllers/sendEmailController.js')


// Route to handle attendance form submission
router.post('/send-email', sendEmail);



module.exports = router;
