const express = require('express');
const router = express.Router();
const { uploadFile,userFileUpload } = require('../controllers/userFileUploadControllers.js');
const { userLogin } = require('../controllers/userLogin.js');
const { getAllUsers } = require('../controllers/allUsersControllers.js');
const { contactUs } = require('../controllers/contactUsControllers.js');
const { getAllContactusMessages } = require('../controllers/getAllContactusMessages.js');
const { updateContact, updateContactUsMessages } = require('../controllers/updateContactUsMessages.js');

// Route to handle attendance form submission
router.post('/upload-users-details', uploadFile,userFileUpload);
router.post('/user-login', userLogin);
router.get('/all-users', getAllUsers);
router.get('/get-user', getAllUsers);
router.post('/contact-us',contactUs );
router.get('/get-contact-us-messages',getAllContactusMessages );
router.put('/update-contact-us-messages',updateContactUsMessages );
router.put('/update-contact-us-messages',updateContactUsMessages );


module.exports = router;
